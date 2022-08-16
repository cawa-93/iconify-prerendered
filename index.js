import {lookupCollection, lookupCollections} from '@iconify/json';
import {getIconData, iconToSVG,} from '@iconify/utils';
import * as fs from "fs";
import * as path from "path";

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

    const componentPath = path.resolve('dist', collectionName)

    for (const iconName of iconsToRender) {
        const icon = getIconData(collection, iconName, true)
        const componentName = capitalize(camelize('icon-' + iconName))
        const componentCode = await renderComponentFile(icon, componentName)

        const componentFilename = `${iconName}.js`

        await fs.promises.mkdir(componentPath, {recursive: true})
        await fs.promises.writeFile(path.resolve(componentPath, componentFilename), componentCode)
    }
    await fs.promises.writeFile(path.resolve(componentPath, 'package.json'), generatePackageJson(collection))
}

/**
 *
 * @param {FullIconifyIcon} icon
 * @param {string} componentName
 * @returns {Promise<string>} rendered vue component
 */
async function renderComponentFile(icon, componentName) {
    const svg = iconToSVG(icon, icon) // FIXME: WTF?
    const props = {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        innerHTML: svg.body,
        ...svg.attributes,
    }
    return `
import { h } from 'vue';
export const ${componentName} = ${renderVueComponent(componentName, props)}
export {${componentName} as default};
    `.trim()
}

function renderVueComponent(componentName, props) {
    return `{
    name: '${componentName}',
    setup() { return () => h('svg', ${JSON.stringify(props)}) }
};`
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
        peerDependencies: {
            vue: '*'
        }
    })
}


for (const collectionName in await lookupCollections()) {
    console.log(`Rendering ${collectionName}`)
    await buildCollection(collectionName)
}
