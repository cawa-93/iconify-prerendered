import {forEachCollection} from "./builder/for-each-collection.js";
import {lookupCollection} from "@iconify/json";
import {collectionToPackage, createPackageJson} from "./builder/create-package-json.js";
import * as path from "node:path";


await forEachCollection(async (collectionName) => {
  /**
   * TODO:
   * - buildReadme()
   * [x] buildPackage()
   * - build framework
   */

  const collection = await lookupCollection(collectionName)
  const packageDist = path.resolve('dist', 'vue-'+collectionName)

  // package.json
  const collectionPackageProperties = collectionToPackage({collection, namePrefix: '@iconify-prerendered/vue-'})
  collectionPackageProperties.peerDependencies = {vue: '*'}
  collectionPackageProperties.description = collectionPackageProperties.description.replace('. Designed for', ' for Vue. Designed for')
  collectionPackageProperties.keywords.push('vue')

  await createPackageJson({
    properties: collectionPackageProperties,
    dist: packageDist
  })

  console.log({collectionName, packageDist})
});

//
// /**
//  * Many icons may have elements with unique IDs, such as masks. IDs are meant to be unique.
//  * If generated icon is embedded in HTML, it cannot have IDs that might be present in
//  * another icon. To solve that, replacing IDs in content with randomly generated IDs.
//  *
//  * But randomly generated IDs will fail tests.
//  * That's why ```--no-replace-ids``` should disable IDs replacement for test build
//  * @type {boolean}
//  */
// const SHOULD_REPLACE_IDS = !process.argv.includes('--no-replace-ids')
//
// /**
//  *
//  * @type {any}
//  */
// const packageJsonBase = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}))
//
// /**
//  *
//  * @param {string} collectionName
//  * @returns {Promise<void>}
//  */
// async function buildCollection(collectionName) {
//   const collection = await lookupCollection(collectionName)
//
//   let iconsToRender = Array.from(Object.keys(collection.icons))
//
//   if (collection.aliases) {
//     iconsToRender = iconsToRender.concat(Object.keys(collection.aliases))
//   }
//
//   let declarations = new Map()
//
//   for (const iconName of iconsToRender) {
//     if (collection.icons[iconName]?.hidden || collection.aliases?.[iconName]?.hidden) {
//       continue
//     }
//     const componentName = getComponentName(iconName)
//
//     /**
//      * HOTFIX: Preventing components name collision
//      * @see https://github.com/cawa-93/iconify-prerendered/issues/2
//      */
//     if (declarations.has(componentName)) {
//       continue
//     }
//
//     const isSimpleAlias = collection.aliases
//       && (iconName in collection.aliases)
//       && ('parent' in collection.aliases[iconName])
//       && Object.keys(collection.aliases[iconName]).length === 1
//
//     if (isSimpleAlias) {
//       const parentComponentName = getComponentName(collection.aliases[iconName].parent)
//       if (declarations.has(parentComponentName)) {
//         declarations.set(componentName, {
//           implementation: `export const ${componentName} = ${parentComponentName};`,
//           type: `export declare const ${componentName}: typeof ${parentComponentName};`
//         })
//         continue
//       }
//     }
//
//     const icon = getIconData(collection, iconName)
//
//     const svg = iconToSVG(icon)
//     const props = {
//       'aria-hidden': true,
//       'role': 'img',
//       innerHTML: SHOULD_REPLACE_IDS ? replaceIDs(svg.body, collectionName+iconName) : svg.body,
//       ...svg.attributes,
//     }
//
//
//     const componentCode = renderVueComponent(props, componentName)
//
//     declarations.set(componentName, {
//       implementation: `export const ${componentName} = ${componentCode};`,
//       type: `export declare const ${componentName}: DefineComponent<{}, {}, any>;`
//     })
//   }
//
//   const {
//     implementationDeclarations,
//     typeDeclarations
//   } = Array.from(declarations.values()).reduce((red, declaration) => {
//     red.implementationDeclarations.push(declaration.implementation)
//     red.typeDeclarations.push(declaration.type)
//     return red
//   }, {implementationDeclarations: [], typeDeclarations: []})
//
//   const fullImplementation = `import {h} from 'vue';\n${implementationDeclarations.join('\n')}`
//   const fullTypeDeclaration = `import type {DefineComponent} from 'vue';\n${typeDeclarations.join('\n')}`
//
//   const componentPath = path.resolve('dist', collectionName)
//   await fs.promises.mkdir(componentPath, {recursive: true})
//   await Promise.all([
//     fs.promises.writeFile(path.resolve(componentPath, 'index.js'), fullImplementation),
//     fs.promises.writeFile(path.resolve(componentPath, 'index.d.ts'), fullTypeDeclaration),
//     fs.promises.writeFile(path.resolve(componentPath, 'package.json'), createPackageJson(collection)),
//     fs.promises.writeFile(path.resolve(componentPath, 'README.md'), generateReadme(collection)),
//   ])
// }
//
// function renderVueComponent(props) {
//   const attributesString = JSON.stringify(props).replace(/}$/, ',...props}')
//   return `(props) => h('svg', ${attributesString})`
// }
//
// /**
//  *
//  * @param {import('@iconify/types').IconifyJSON} collection
//  * @returns {string}
//  */
// function createPackageJson(collection) {
//   const [major, minor] = packageJsonBase.version.split('.')
//   return JSON.stringify({
//     name: `@iconify-prerendered/vue-${collection.prefix}`,
//     version: [major, minor, collection.lastModified].join('.'),
//     description: `${collection.info.name} components for Vue. Designed for ease of use and high performance`,
//     type: 'module',
//     main: './index.js',
//     types: './index.d.ts',
//     peerDependencies: {
//       vue: '*'
//     },
//     license: collection.info.license.spdx,
//     author: packageJsonBase.author,
//     bugs: packageJsonBase.bugs,
//     homepage: packageJsonBase.homepage,
//     repository: packageJsonBase.repository,
//     keywords: [
//       ...packageJsonBase.keywords,
//       collection.prefix,
//       collection.info.name,
//     ],
//   })
// }
//
//
// /**
//  * @param {import('@iconify/types').IconifyJSON} collection
//  * @returns {string}
//  */
// function generateReadme(collection) {
//   return `
// # ${collection.info.name} components for Vue. Designed for ease of use and high performance
//
//
// Each icon in set is standalone component.
//
// ## Features
// - **Easy to use**
//   - No plugins required! Compatible with any build tools.
//   - Zero dependencies.
//   - SSR / SSG friendly.
//   - TypeScript support.
// - **High performance**
//   - Does not require any external resources like fonts, css, images.
//   - The icon code is embedded in your bundle.
//   - Supports tree shaking, so only those icons that you have used will be included in the bundle.
//   - Works offline.
// - Powered by [iconify](https://iconify.design/).
//
// ## Usage
// \`\`\`vue
// <script setup>
// // Import components as usual
// import {
//     ${collection.info.samples.map(getComponentName).join(',\n    ')}
// } from '@iconify-prerendered/vue-${collection.prefix}'
// </script>
//
// <template>
//   <!-- And just use it in template -->
//   ${
//     collection.info.samples.map(getComponentName).map(name => `<${name}/>`).join('\n  ')
//   }
// </template>
// \`\`\`
//
// Only these three icons will be included in your bundle. All other icons may be tree-shaken by your bundler.
//
// That's all you need. No plugins, extra configs, IDE extensions or something else. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).
//
// See [full docs](${packageJsonBase.homepage}#readme) or [other available icons sets](${packageJsonBase.homepage}#available-icons-sets).
// `
// }

//
// for (const collectionName in await lookupCollections()) {
//   console.log(`Rendering ${collectionName}`)
//   await buildCollection(collectionName)
// }
