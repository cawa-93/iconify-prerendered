import fs from "node:fs";
import * as path from "path";
import {getPackageJson} from "./get-package-json.js";

const packageJsonBase = getPackageJson()

const defaultPackageJsonProperties = {
  type: 'module',
  main: './index.js',
  types: './index.d.ts',
  author: packageJsonBase.author,
  bugs: packageJsonBase.bugs,
  homepage: packageJsonBase.homepage,
  repository: packageJsonBase.repository,
  peerDependencies: {},
}

/**
 *
 * @param {import('@iconify/types').IconifyJSON} collection
 * @return {{
 *     version,
 *     description,
 *     license,
 *     keywords,
 *   }}
 */
export function collectionToPackage({collection}) {
  const [major, minor] = packageJsonBase.version.split('.')
  const version = [major, minor, collection.lastModified].join('.')
  const description = `${collection.info.name} components. Designed for ease of use and high performance`
  const license = collection.info.license.spdx
  const keywords = [
    ...packageJsonBase.keywords,
    collection.prefix,
    collection.info.name,
  ]

  return {
    version,
    description,
    license,
    keywords,
  }
}

/**
 * @param {Object} properties
 * @param {string} dist
 */
export async function createPackageJson({properties, dist}) {
  await fs.promises.mkdir(dist, {recursive: true})

  return fs.promises.writeFile(path.resolve(dist, 'package.json'), JSON.stringify({
    ...defaultPackageJsonProperties,
    ...properties
  }), {encoding: 'utf8'})
}
