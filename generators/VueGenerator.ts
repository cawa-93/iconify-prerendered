import type { IconifyJSON } from "../npm-deps.ts";
import {
  type ExtendedIconifyIcon,
  iconToSVG,
  parseIconSet,
  replaceIDs,
} from "../npm-deps.ts";
import { getComponentName } from "../utils/getComponentName.ts";

export class VueGenerator {
  constructor(private replaceIds: boolean) {
  }

  generate(collection: IconifyJSON) {
    let implementationOutput = `import {h} from 'vue';\n`;
    let typesOutput = `import type {SVGAttributes, VNode} from 'vue';\n`;

    const aliases = new Map<string, string>();

    parseIconSet(
      collection,
      (name: string, data: ExtendedIconifyIcon | null) => {
        // Hidden icons should NOT be rendered
        if (!data || data.hidden) {
          return;
        }

        const alias = this.aliasTo(name, collection.aliases);

        if (alias) {
          const componentName = getComponentName(name);

          // Skip aliases like unlock2 -> unlock-2
          if (alias === componentName) {
            return;
          }

          const existedAlias = aliases.get(componentName);
          if (existedAlias && existedAlias !== alias) {
            throw new Error(
              `You tried export two components (${existedAlias}, ${componentName}) with same name ${alias}`,
            );
          }

          aliases.set(componentName, alias);
        } else {
          const { implementation, type } = this.getComponentDeclaration({
            name,
            data,
            collection,
          });
          implementationOutput += `${implementation};\n`;
          typesOutput += `${type};\n`;
        }
      },
    );

    if (aliases.size > 0) {
      implementationOutput += "export {\n";
      typesOutput += "export {\n";
      for (const [component, alias] of aliases) {
        implementationOutput += `${alias} as ${component},\n`;
        typesOutput += `${alias} as ${component},\n`;
      }
      implementationOutput += "}\n";
      typesOutput += "}\n";
    }

    return {
      implementation: implementationOutput,
      type: typesOutput,
    };
  }

  private aliasTo(name: string, aliases: IconifyJSON["aliases"]) {
    const isAlias = aliases && // collection has some aliases
      (name in aliases) && // current icon is in alias
      ("parent" in aliases[name]) && // current icon has parent icon
      Object.keys(aliases[name]).length === 1; // current icon doesn't have any changed properties from parent

    return isAlias ? getComponentName(aliases[name].parent) : null;
  }

  private getComponentDeclaration({
    data,
    name,
    collection,
  }: { data: ExtendedIconifyIcon; name: string; collection: IconifyJSON }) {
    const componentName = getComponentName(name);
    return {
      implementation: `export const ${componentName}=${
        this.getComponentImplementation({
          data,
          name,
          prefix: collection.prefix,
        })
      }`,
      type:
        `export declare const ${componentName}: (p: SVGAttributes) => VNode`,
    };
  }

  private getComponentImplementation({
    data,
    name,
    prefix,
  }: { data: ExtendedIconifyIcon; name: string; prefix: string }): string {
    const defaultInlinedProps = {
      "aria-hidden": true,
      "role": "img",
    };

    const svg = iconToSVG(data);
    const props = {
      ...defaultInlinedProps,
      innerHTML: this.replaceIds
        ? replaceIDs(svg.body, prefix + name)
        : svg.body,
      ...svg.attributes,
    };

    const paramName = "p";
    const attributesString = JSON.stringify(props).replace(
      /}$/,
      `,...${paramName}}`,
    );
    return `${paramName}=>h('svg', ${attributesString})`;
  }
}
