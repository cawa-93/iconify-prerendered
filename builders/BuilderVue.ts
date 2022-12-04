import {BuilderBase} from "./BuilderBase.ts";
import {PackageJson} from "../utils/pkg-type.ts";
import {outdent} from "https://deno.land/x/outdent@v0.8.0/src/index.ts";
import {iconToSVG, parseIconSet, replaceIDs} from '../npm-deps.ts'

const SHOULD_REPLACE_IDS = Deno.args.includes('--replace-ids')

export class BuilderVue extends BuilderBase {

    defaultSvgAttrs = {
        'aria-hidden': true,
        'role': 'img',
    }

    get packageJsonObject(): PackageJson {
        const pkg = super.packageJsonObject;

        // peerDependencies
        if (!pkg.peerDependencies) {
            pkg.peerDependencies = {}
        }

        pkg.peerDependencies.vue = '>=3.0.0'


        // keywords
        if (!Array.isArray(pkg.keywords)) {
            pkg.keywords = []
        }
        pkg.keywords.push('vue')

        // patch description
        if (pkg.description) {
            pkg.description = pkg.description.replaceAll('components', 'Vue components')
        }

        return pkg
    }

    get readmeText(): string {
        let readme = super.readmeText;

        // patch title
        readme = readme.replace(/^(# Prerendered.*)\n/, '$1 for Vue\n')

        // usage
        const samples = (this.collection.info?.samples || ['icon-name']).map(BuilderVue.getComponentName)
        const usage = outdent`
        \`\`\`vue
            <script setup>
                // Import components as usual
                import {
                    ${
            samples.map(s => s).join(',\n            ')
        }
                } from '${this.packageJsonObject.name}'
            </script>
            
            <template>
                <!-- And just use it in template -->
                ${
            samples.map(s => `<${s}/>`).join('\n        ')
        }
            </template>
        \`\`\`
        `
        readme = readme.replaceAll('<!-- USAGE NOT IMPLEMENTED -->', usage)

        return readme
    }

    async renderCollection(): Promise<void> {
        let declarations = new Map()

        parseIconSet(this.collection, (iconName, data) => {
            // Hidden icons should NOT be rendered
            if (!data || data.hidden) {
                return
            }

            const componentName = BuilderVue.getComponentName(iconName)

            /**
             * HOTFIX: Preventing components name collision
             * @see https://github.com/cawa-93/iconify-prerendered/issues/2
             */
            if (declarations.has(componentName)) {
                return;
            }

            /**
             * Check is icon the simple alias of another icon
             * Simple alias is icon without any changes. Just another icon name.
             * That components may be implemented like:
             * `export const Icon = ParentIcon`
             */
            if (
                this.collection.aliases // collection has some aliases
                && (iconName in this.collection.aliases) // current icon is in alias
                && ('parent' in this.collection.aliases[iconName]) // current icon has parent icon
                && Object.keys(this.collection.aliases[iconName]).length === 1 // current icon doesn't have any changed properties from parent
            ) {
                const parentComponentName = BuilderVue.getComponentName(this.collection.aliases[iconName].parent)
                if (declarations.has(parentComponentName)) {
                    declarations.set(componentName, {
                        implementation: `export const ${componentName}=${parentComponentName};`,
                        type: `export declare const ${componentName}: typeof ${parentComponentName};`
                    })
                    return;
                }
            }

            const svg = iconToSVG(data)
            const props = {
                ...this.defaultSvgAttrs,
                innerHTML: SHOULD_REPLACE_IDS ? replaceIDs(svg.body, this.collection.prefix + iconName) : svg.body,
                ...svg.attributes,
            }


            const componentCode = this.renderVueComponent(props)

            declarations.set(componentName, {
                implementation: `export const ${componentName}=${componentCode};`,
                type: `export declare const ${componentName}: DefineComponent<{}, {}, any>;`
            })
        })

        const {
            implementationDeclarations,
            typeDeclarations
        } = Array.from(declarations.values()).reduce((red, declaration) => {
            red.implementationDeclarations.push(declaration.implementation)
            red.typeDeclarations.push(declaration.type)
            return red
        }, {implementationDeclarations: [], typeDeclarations: []})

        const fullImplementation = `import {h} from 'vue';\n${implementationDeclarations.join('\n')}`
        const fullTypeDeclaration = `import type {DefineComponent} from 'vue';\n${typeDeclarations.join('\n')}`

        await Promise.all([
            this.writeFile('index.js', fullImplementation),
            this.writeFile('index.d.ts', fullTypeDeclaration),
        ])
    }

    renderVueComponent(props: Record<string, any>) {
        const paramName = 'p'
        const attributesString = JSON.stringify(props).replace(/}$/, `,...${paramName}}`)
        return `${paramName}=>h('svg', ${attributesString})`
    }
}
