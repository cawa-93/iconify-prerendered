import {getComponentName} from "./getComponentName.js";
import {iconToSVG, parseIconSet, replaceIDs} from "@iconify/utils";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Many icons may have elements with unique IDs, such as masks. IDs are meant to be unique.
 * If generated icon is embedded in HTML, it cannot have IDs that might be present in
 * another icon. To solve that, replacing IDs in content with randomly generated IDs.
 *
 * But randomly generated IDs will fail tests.
 * That's why ```--no-replace-ids``` should disable IDs replacement for test build
 * @type {boolean}
 */
const SHOULD_REPLACE_IDS = !process.argv.includes('--no-replace-ids')

/**
 *
 * @param {import('@iconify/types').IconifyJSON} collection
 * @param {string} dist
 * @returns {Promise<void>}
 */
export async function createVueComponents({collection, dist}) {
  let declarations = new Map()

  parseIconSet(collection, (iconName, data) => {
    // Hidden icons should NOT be rendered
    if (!data || data.hidden) {
      return
    }

    const componentName = getComponentName(iconName)

    /**
     * HOTFIX: Preventing components name collision
     * @see https://github.com/cawa-93/iconify-prerendered/issues/2
     */
    if (declarations.has(componentName)) {
      return;
    }

    const isSimpleAlias = collection.aliases
      && (iconName in collection.aliases)
      && ('parent' in collection.aliases[iconName])
      && Object.keys(collection.aliases[iconName]).length === 1

    if (isSimpleAlias) {
      const parentComponentName = getComponentName(collection.aliases[iconName].parent)
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
      'aria-hidden': true,
      'role': 'img',
      innerHTML: SHOULD_REPLACE_IDS ? replaceIDs(svg.body, collection.prefix + iconName) : svg.body,
      ...svg.attributes,
    }


    const componentCode = renderVueComponent(props, componentName)

    declarations.set(componentName, {
      implementation: `export const ${componentName}=${componentCode};`,
      type: `export declare const ${componentName}: (p: SVGAttributes) => VNode;`
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
  const fullTypeDeclaration = `import type {VNode, SVGAttributes} from 'vue';\n${typeDeclarations.join('\n')}`

  await fs.promises.mkdir(dist, {recursive: true})
  await Promise.all([
    fs.promises.writeFile(path.resolve(dist, 'index.js'), fullImplementation),
    fs.promises.writeFile(path.resolve(dist, 'index.d.ts'), fullTypeDeclaration),
  ])
}

function renderVueComponent(props) {
  const paramName = 'p'
  const attributesString = JSON.stringify(props).replace(/}$/, `,...${paramName}}`)
  return `${paramName}=>h('svg', ${attributesString})`
}
