import {getComponentName} from "./getComponentName.js";
import {getPackageJson} from "./get-package-json.js";
import fs from "node:fs";
import path from "path";

const packageJsonBase = getPackageJson()

const description = 'Designed for ease of use and high performance. Each icon in set is standalone component.'
const features = `
- **Easy to use**
  - No plugins required! Compatible with any build tools.
  - Zero dependencies.
  - SSR / SSG friendly.
  - TypeScript support.
- **High performance**
  - Does not require any external resources like fonts, css, images.
  - The icon code is embedded in your bundle.
  - Supports tree shaking, so only those icons that you have used will be included in the bundle.
  - Works offline.
- Powered by [iconify](https://iconify.design/).
`
const usageDescription = 'Only these three icons will be included in your bundle. All other icons may be tree-shaken by your bundler.'
const afterwords = `
That's all you need. No plugins, extra configs, IDE extensions or something else. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).

See [full docs](${packageJsonBase.homepage}#readme) or [other available icons sets](${packageJsonBase.homepage}#available-icons-sets).
`


/**
 * @param {import('@iconify/types').IconifyJSON} collection
 * @param {string} namePrefix
 * @return {{
 *     title,
 *     usage,
 *     description,
 *     features,
 *     usageDescription,
 *     footer,
 *   }}
 */
export function collectionToReadmeParts({collection, namePrefix}) {
  const title = `${collection.info.name} components`
  const sampleIcons = collection.info.samples.map(getComponentName)
  const usage = `
\`\`\`vue
<script setup>
// Import components as usual
import {
    ${sampleIcons.join(',\n    ')}
} from '${namePrefix}${collection.prefix}'</script>

<template>
  <!-- And just use it in template -->
  ${sampleIcons.map(name => `<${name}/>`).join('\n  ')}
</template>
\`\`\`
  `

  return {
    title,
    usage,
    description,
    features,
    usageDescription,
    footer: afterwords,
  }
}


/**
 * @param {{
 *     title,
 *     usage,
 *     description,
 *     features,
 *     usageDescription,
 *     footer
 *   }} properties
 * @param {string} dist
 * @returns {string}
 */
export async function createReadme({properties, dist}) {
  const {title, description, features, usage, usageDescription, footer} = properties
  const readme = `
# ${title}

${description}

## Features
${features}

## Usage
${usage}

${usageDescription}

${footer}
`

  await fs.promises.mkdir(dist, {recursive: true})

  return fs.promises.writeFile(path.resolve(dist, 'README.md'), readme, {encoding: 'utf8'})
}
