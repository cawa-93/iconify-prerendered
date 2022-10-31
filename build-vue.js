import {forEachIconsCollection} from "./builder/for-each-icons-collection.js";
import {lookupCollection} from "@iconify/json";
import {collectionToPackage, createPackageJson} from "./builder/create-package-json.js";
import * as path from "node:path";
import {collectionToReadmeParts, createReadme} from "./builder/create-readme.js";
import {createVueComponents} from "./create-vue-components.js";


await forEachIconsCollection(async (collectionName) => {
  const collection = await lookupCollection(collectionName)
  const packageDist = path.resolve('dist', 'vue-' + collectionName)
  const packageNamePrefix = '@iconify-prerendered/vue-';

  // package.json
  const collectionPackageProperties = collectionToPackage({collection, namePrefix: packageNamePrefix})
  collectionPackageProperties.peerDependencies = {vue: '*'}
  collectionPackageProperties.description = collectionPackageProperties.description.replace('. Designed for', ' for Vue. Designed for')
  collectionPackageProperties.keywords.push('vue')

  await createPackageJson({
    properties: collectionPackageProperties,
    dist: packageDist
  })


  // README.md
  const readmeParts = collectionToReadmeParts({collection, namePrefix: packageNamePrefix})
  readmeParts.title += ' for Vue'

  await createReadme({properties: readmeParts, dist: packageDist})

  // Vue components
  await createVueComponents({
    collection, dist: packageDist
  })
});


