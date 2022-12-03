import {BuilderBase} from "./BuilderBase.ts";
import {PackageJson} from "../utils/pkg-type.ts";
import {outdent} from "https://deno.land/x/outdent@v0.8.0/src/index.ts";

export class BuilderVue extends BuilderBase {
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
}
