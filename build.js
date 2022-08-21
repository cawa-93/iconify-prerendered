import {lookupCollection, lookupCollections} from '@iconify/json';
import {getIconData, iconToSVG} from '@iconify/utils';
import * as fs from "fs";
import * as path from "path";
import {getComponentName} from "./getComponentName.js";

const packageJsonBase = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}))


/**
 *
 * @param {string} collectionName
 * @returns {Promise<void>}
 */
async function buildCollection(collectionName) {
  const collection = await lookupCollection(collectionName)

  let iconsToRender = Array.from(Object.keys(collection.icons))

  if (collection.aliases) {
    iconsToRender = iconsToRender.concat(Object.keys(collection.aliases))
  }

  let declarations = new Map()

  for (const iconName of iconsToRender) {
    if (collection.icons[iconName]?.hidden || collection.aliases?.[iconName]?.hidden) {
      continue
    }
    const componentName = getComponentName(iconName)

    /**
     * HOTFIX: Preventing components name collision
     * @see https://github.com/cawa-93/iconify-prerendered/issues/2
     */
    if (declarations.has(componentName)) {
      continue
    }

    const isSimpleAlias = collection.aliases
      && (iconName in collection.aliases)
      && ('parent' in collection.aliases[iconName])
      && Object.keys(collection.aliases[iconName]).length === 1

    if (isSimpleAlias) {
      const parentComponentName = getComponentName(collection.aliases[iconName].parent)
      if (declarations.has(parentComponentName)) {
        declarations.set(componentName, {
          implementation: `export const ${componentName} = ${parentComponentName};`,
          type: `export declare const ${componentName}: typeof ${parentComponentName};`
        })
        continue
      }
    }

    const icon = getIconData(collection, iconName, true)

    const svg = iconToSVG(icon, icon) // FIXME: WTF?
    const props = {
      'xmlns': 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      'aria-hidden': true,
      'role': 'img',
      innerHTML: svg.body,
      ...svg.attributes,
    }


    const componentCode = renderVueComponent(props, componentName)

    declarations.set(componentName, {
      implementation: `export const ${componentName} = ${componentCode};`,
      type: `export declare const ${componentName}: DefineComponent<{}, {}, any>;`
    })
  }

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

  const componentPath = path.resolve('dist', collectionName)
  await fs.promises.mkdir(componentPath, {recursive: true})
  await Promise.all([
    fs.promises.writeFile(path.resolve(componentPath, 'index.js'), fullImplementation),
    fs.promises.writeFile(path.resolve(componentPath, 'index.d.ts'), fullTypeDeclaration),
    fs.promises.writeFile(path.resolve(componentPath, 'package.json'), generatePackageJson(collection)),
    fs.promises.writeFile(path.resolve(componentPath, 'README.md'), generateReadme(collection)),
  ])
}

function renderVueComponent(props, componentName = null) {
  return `{${componentName ? `name: '${componentName}',` : ''} setup() { return () => h('svg', ${JSON.stringify(props)}) }}`
}

/**
 *
 * @param {IconifyJSON} collection
 * @returns {string}
 */
function generatePackageJson(collection) {
  const [major, minor] = packageJsonBase.version.split('.')
  return JSON.stringify({
    name: `@iconify-prerendered/vue-${collection.prefix}`,
    version: [major, minor, collection.lastModified].join('.'),
    description: `A set of standalone icon components for views with zero dependencies. Designed for excellent tree shaking. ${collection.info.name}`,
    type: 'module',
    main: './index.js',
    types: './index.d.ts',
    peerDependencies: {
      vue: '*'
    },
    license: collection.info.license.spdx,
    author: packageJsonBase.author,
    bugs: packageJsonBase.bugs,
    homepage: packageJsonBase.homepage,
    repository: packageJsonBase.repository,
    keywords: [
      ...packageJsonBase.keywords,
      collection.prefix,
      collection.info.name,
    ],
  })
}


/**
 * @param {IconifyJSON} collection
 * @returns {string}
 */
function generateReadme(collection) {
  return `
# ${collection.info.name} components for Vue
A set of icon-components.

Each icon in set is standalone component, so you can easily use it.
- No plugins required. Compatible with any builder.
- The icon code is embedded in your bundle.
- Supports tree shaking, so only those icons that you have used will be included in the bundle.
- Works offline.
- Does not require any external resources like fonts or css.
- Zero dependencies.
- Powered by [iconify](https://iconify.design/).

## Usage
\`\`\`vue
<script setup>
// Import components as usual
import {
    ${collection.info.samples.map(getComponentName).join(',\n    ')}
} from '@iconify-prerendered/vue-${collection.prefix}'
</script>

<template>
  <!-- And just use it in template -->
  ${
    collection.info.samples.map(getComponentName).map(name => `<${name}/>`).join('\n  ')
  }
</template>
\`\`\`
That's all you need. No bundler plugins or IDE extensions. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).

See [full docs](${packageJsonBase.homepage}#readme) or [other available icons sets](${packageJsonBase.homepage}#available-icons-sets).
`
}


for (const collectionName in await lookupCollections()) {
  console.log(`Rendering ${collectionName}`)
  await buildCollection(collectionName)
}
