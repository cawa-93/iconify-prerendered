import {camelize, IconifyJSON, lookupCollection} from "../npm-deps.ts";
import {iconToSVG, parseIconSet, replaceIDs, type ExtendedIconifyIcon } from '../npm-deps.ts'
import {capitalize} from "../utils/capitalize.ts";

export interface IGenerator {
    generate(collection: IconifyJSON): string | Promise<string>
}

export class Generator implements IGenerator {

    constructor(private replaceIds: boolean) {
    }

    generate(collection: IconifyJSON) {
        let output = `import {h, type SVGAttributes} from 'npm:vue@latest';\n`

        parseIconSet(collection, (name: string, data: ExtendedIconifyIcon | null) => {
            // Hidden icons should NOT be rendered
            if (!data || data.hidden) {
                return
            }

            output += this.getComponentDeclaration({name, data, collection}) + ';\n'
        })

        return output
    }


    private getComponentDeclaration({data, name, collection}: { data: ExtendedIconifyIcon, name: string, collection: IconifyJSON }) {

        const isSimpleAlias =
            collection.aliases // collection has some aliases
            && (name in collection.aliases) // current icon is in alias
            && ('parent' in collection.aliases[name]) // current icon has parent icon
            && Object.keys(collection.aliases[name]).length === 1 // current icon doesn't have any changed properties from parent


        const implementation = isSimpleAlias
            ? this.getComponentName(collection.aliases![name].parent)
            : this.getComponentImplementation({data, name, prefix: collection.prefix});

        return `export const ${this.getComponentName(name)} = ${implementation}`;
    }

    private getComponentName(iconName: string): string {
        /**
         * The names of some icons cannot be automatically resolved to valid component names so that they do not conflict with other components.
         * For such cases, individual conversion rules apply
         * @type {Map<string, string>}
         */
        const specialCases = new Map([
            ['menu-alt-2', 'IconMenuAltDash2'] // dashicon/menu-alt-2 will be resolved as `IconMenuAlt2` but it's alias for `IconMenuAlt3`
        ])

        const specialCase = specialCases.get(iconName)
        if (specialCase) {
            return specialCase
        }

        let name = capitalize(camelize(`icon${iconName.startsWith('-') ? iconName : `-${iconName}`}`));
        if (name.endsWith('-')) {
            name = name.replace(/-$/, 'Minus')
        }
        return name
    }

    private getComponentImplementation({data, name, prefix}: { data: ExtendedIconifyIcon, name: string, prefix: string }): string {

        const defaultInlinedProps = {
            'aria-hidden': true,
            'role': 'img',
        }

        const svg = iconToSVG(data)
        const props = {
            ...defaultInlinedProps,
            innerHTML: this.replaceIds ? replaceIDs(svg.body, prefix + name) : svg.body,
            ...svg.attributes,
        }

        const paramName = 'p'
        const attributesString = JSON.stringify(props).replace(/}$/, `,...${paramName}}`)
        return `(${paramName}: SVGAttributes)=>h('svg', ${attributesString})`

    }
}
