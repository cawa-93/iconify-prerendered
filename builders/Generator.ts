import type {IconifyJSON} from "../npm-deps.ts";
import {iconToSVG, parseIconSet, replaceIDs, type ExtendedIconifyIcon } from '../npm-deps.ts'
import {getComponentName} from "./getComponentName.ts";

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

        return isSimpleAlias
            ? `export {${getComponentName(collection.aliases[name].parent)} as ${getComponentName(name)}}`
            : `export const ${getComponentName(name)} = ${this.getComponentImplementation({data, name, prefix: collection.prefix})}`;
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
