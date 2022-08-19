import {lookupCollection, lookupCollections} from '@iconify/json';
import {getIconData, iconToSVG,} from '@iconify/utils';
import * as fs from "fs";
import * as path from "path";

const packageJsonBase = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}))

/**
 * @param {string} s
 * @returns {string}
 */
function camelize(s) {
  return s.replace(/-./g, x => x[1].toUpperCase());
}

/**
 * @param {string} s
 * @returns {string}
 */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


function getComponentName(iconName) {
  return capitalize(camelize('icon-' + iconName));
}

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

  let declarations = `import { h } from 'vue';\n`
  let typeDeclarations = `import type { DefineComponent } from 'vue';\n`

  for (const iconName of iconsToRender) {
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


    const componentName = getComponentName(iconName)
    const componentCode = renderVueComponent(componentName, props)

    declarations += `export const ${componentName} = ${componentCode};\n`
    typeDeclarations += `export declare const ${componentName}: DefineComponent<{}, {}, any>;\n`
  }

  const componentPath = path.resolve('dist', collectionName)
  await fs.promises.mkdir(componentPath, {recursive: true})
  await Promise.all([
    fs.promises.writeFile(path.resolve(componentPath, 'index.js'), declarations),
    fs.promises.writeFile(path.resolve(componentPath, 'index.d.ts'), typeDeclarations),
    fs.promises.writeFile(path.resolve(componentPath, 'package.json'), generatePackageJson(collection)),
    fs.promises.writeFile(path.resolve(componentPath, 'README.md'), generateReadme(collection)),
  ])
}

function renderVueComponent(componentName, props) {
  return `{name: '${componentName}', setup() { return () => h('svg', ${JSON.stringify(props)}) }}`
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
A set of standalone icon-components for Vue with zero dependencies. Designed for excellent tree shaking.

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
That's all you need. No bundler plugins or IDE extensions. It just works.

See [full docs](${packageJsonBase.homepage}#readme) or [other available icons sets](${packageJsonBase.homepage}#available-icons-sets).
`
}


for (const collectionName in await lookupCollections()) {
  console.log(`Rendering ${collectionName}`)
  await buildCollection(collectionName)
}
