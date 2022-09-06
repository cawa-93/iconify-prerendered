import {lookupCollection, lookupCollections} from "@iconify/json";
import type {IconifyJSON} from '@iconify/types'
import {getIconData, iconToSVG} from "@iconify/utils";
import {getComponentName} from "./getComponentName.js";
import {IconifyIconBuildResult} from "@iconify/utils/lib/svg/build";
import {resolve} from "path";
import {mkdir, readFile, writeFile} from "fs/promises";


const packageJsonBase = JSON.parse(await readFile('./package.json', {encoding: 'utf8'}))


export abstract class Builder {

  abstract framework: string

  svgAttrs = {
    'aria-hidden': true,
    role: 'img',
  }

  output = 'dist'


  lookupCollections() {
    return lookupCollections().then(Object.keys)
  }


  lookupCollection = lookupCollection
  getComponentName = getComponentName


  lookupIconsInCollection(collection: IconifyJSON, omitHidden = true) {
    let icons = Array.from(Object.keys(collection.icons));

    if (collection.aliases) {
      icons = icons.concat(Object.keys(collection.aliases))
    }

    if (!omitHidden) {
      return icons
    }

    return icons.filter(iconName => {
      // @ts-expect-error Actual type is wrong. Will be fixed in next release
      // https://github.com/iconify/iconify/blob/33b3e42834a473239ee76c290ef9c83efcdd9a7a/packages/types/types.d.ts#L165
      const {hidden} = getIconData(collection, iconName, true)
      return !hidden
    })
  }

  isSimpleAlias(collection: IconifyJSON, iconName: string) {
    return collection.aliases
      && (iconName in collection.aliases)
      && ('parent' in collection.aliases[iconName])
      && Object.keys(collection.aliases[iconName]).length === 1
  }


  abstract componentImplementation(svg: IconifyIconBuildResult): string

  abstract componentTypeDeclaration(svg: IconifyIconBuildResult): string

  generatePackageJson(collection: IconifyJSON) {
    const [major, minor] = packageJsonBase.version.split('.')
    return {
      name: `@iconify-prerendered/${this.framework}-${collection.prefix}`,
      // @ts-ignore
      version: [major, minor, collection.lastModified].join('.'),
      description: `${collection.info.name} components. Designed for ease of use and high performance`,
      type: 'module',
      main: './index.js',
      types: './index.d.ts',
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
    }
  }

  abstract generateReadme(collection: IconifyJSON): string

  async buildCollection(collectionName: string) {
    const collection = await this.lookupCollection(collectionName)
    const icons = this.lookupIconsInCollection(collection)

    let declarations = new Map()

    for (const iconName of icons) {
      const componentName = getComponentName(iconName)

      if (declarations.has(componentName)) {
        continue
      }


      if (this.isSimpleAlias(collection, iconName)) {
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

      const svg = iconToSVG(icon, icon as any) // FIXME: WTF?

      svg.attributes = {...svg.attributes, ...this.svgAttrs}

      declarations.set(componentName, {
        implementation: `export const ${componentName} = ${this.componentImplementation(svg)};`,
        type: `export declare const ${componentName}: ${this.componentTypeDeclaration(svg)};`
      })
    }

    const {
      implementations,
      typeDeclarations
    } = Array.from(declarations.values()).reduce((reducer, {implementation, type}) => {
      reducer.implementations.push(implementation)
      reducer.typeDeclarations.push(type)
      return reducer
    }, {implementations: [], typeDeclarations: []})
    const fullImplementation = this.joinImplementations(implementations)
    const fullTypeDeclaration = this.joinTypeDeclarations(typeDeclarations)

    const output = resolve(this.output, collectionName)

    await mkdir(output, {recursive: true})
    await Promise.all([
      writeFile(resolve(output, 'index.js'), fullImplementation),
      writeFile(resolve(output, 'index.d.ts'), fullTypeDeclaration),
      writeFile(resolve(output, 'package.json'), JSON.stringify(this.generatePackageJson(collection))),
      writeFile(resolve(output, 'README.md'), this.generateReadme(collection)),
    ])
  }


  async buildAllCollections() {
    for (const collectionName of await this.lookupCollections()) {
      console.log(`Rendering ${collectionName}`)
      await this.buildCollection(collectionName)
    }
  }

  abstract joinImplementations(implementations: string[]): string

  abstract joinTypeDeclarations(typeDeclarations: string[]): string
}
