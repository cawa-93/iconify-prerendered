import {
  type ExtendedIconifyIcon,
  type IconifyJSON,
  iconToSVG,
  parseIconSet,
  replaceIDs,
} from '../npm-deps.ts';
import { getComponentName } from '../utils/getComponentName.ts';
import JSON5 from 'npm:json5@2.2.3';

export class VueGenerator {
  constructor(private replaceIds: boolean) {
  }

  generate(collection: IconifyJSON) {
    let implementationOutput =
      `/// <reference types="./index.d.ts" />\nimport {createElementVNode as h} from 'vue';\n`;
    let typesOutput = `import type {SVGAttributes, VNode} from 'vue';\n`;

    const implToComponents = new Map<string, Set<string>>();

    parseIconSet(
      collection,
      (name: string, data: ExtendedIconifyIcon | null) => {
        // Hidden icons should NOT be rendered
        if (!data || data.hidden) {
          return;
        }

        const body = this.getInnerHTML(data, collection.prefix, name);
        const attributes = this.getAttributes(data);

        const implementation = this.getImplementation(body, attributes);

        const namesSet = implToComponents.get(implementation) ||
          new Set<string>();
        namesSet.add(getComponentName(name));
        implToComponents.set(implementation, namesSet);
      },
    );

    let aliases = '';

    for (const [implementation, namesSet] of implToComponents) {
      const namesIterator = namesSet.values();

      const firstComponentName = namesIterator.next().value;

      implementationOutput +=
        `export const ${firstComponentName}=${implementation};\n`;
      typesOutput +=
        `export declare const ${firstComponentName}: (p?: SVGAttributes) => VNode;\n`;

      for (const name of namesIterator) {
        aliases += `${aliases ? ',' : ''}${firstComponentName} as ${name}`;
      }
    }

    if (aliases) {
      const exportAliases = `export {${aliases}};\n`;
      implementationOutput += exportAliases;
      typesOutput += exportAliases;
    }

    return {
      implementation: implementationOutput,
      type: typesOutput,
    };
  }

  private getImplementation(
    innerHTML: string,
    attributes: Record<string, string | number | boolean>,
  ): string {
    const props = {
      'aria-hidden': true,
      'role': 'img',
      innerHTML,
      ...attributes,
    };

    const paramName = 'p';
    const attributesString = JSON5.stringify(props).replace(
      /}$/,
      `,...${paramName}}`,
    );

    return `${paramName}=>h('svg',${attributesString},null,16)`;
  }

  private getInnerHTML(
    data: ExtendedIconifyIcon,
    prefix: string,
    name: string,
  ) {
    const svg = iconToSVG(data);

    return this.replaceIds ? replaceIDs(svg.body, prefix + name) : svg.body;
  }

  private getAttributes(data: ExtendedIconifyIcon) {
    return iconToSVG(data).attributes;
  }
}
