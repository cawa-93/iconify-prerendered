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
            innerHTML: svg.body,
            ...svg.attributes,
        }


        const componentName = capitalize(camelize('icon-' + iconName))
        const componentCode = renderVueComponent(componentName, props)

        declarations += `export const ${componentName} = ${componentCode};\n`
        typeDeclarations += `export declare const ${componentName}: DefineComponent<{}, {}, any>;\n`
    }

    const componentPath = path.resolve('dist', collectionName)
    await fs.promises.mkdir(componentPath, {recursive: true})
    await fs.promises.writeFile(path.resolve(componentPath, 'index.js'), declarations)
    await fs.promises.writeFile(path.resolve(componentPath, 'index.d.ts'), typeDeclarations)
    await fs.promises.writeFile(path.resolve(componentPath, 'package.json'), generatePackageJson(collection))
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
    return JSON.stringify({
        name: `@iconify-prerendered/vue-${collection.prefix}`,
        version: `0.0.${collection.lastModified}`,
        description: `Pre-rendered into vue components ${collection.info.name}`,
        main: './index.js',
        types: './index.d.ts',
        peerDependencies: {
            vue: '*'
        },
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


for (const collectionName in await lookupCollections()) {
    console.log(`Rendering ${collectionName}`)
    await buildCollection(collectionName)
}
