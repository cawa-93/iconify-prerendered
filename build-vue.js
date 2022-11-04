import {forEachIconsCollection} from "./builder/for-each-icons-collection.js";
import {collectionToPackage, createPackageJson} from "./builder/create-package-json.js";
import {collectionToReadmeParts, createReadme} from "./builder/create-readme.js";
import {createVueComponents} from "./builder/create-vue-components.js";
import {getPackageName} from "./builder/get-package-name.js";
import {getPackageDist} from "./builder/get-package-dist.js";


await forEachIconsCollection(async (collection) => {
  const packageName = getPackageName(collection.prefix, 'vue')
  const packageDist = getPackageDist(packageName)

  // package.json
  const collectionPackageProperties = collectionToPackage({collection})
  collectionPackageProperties.name = packageName
  collectionPackageProperties.peerDependencies = {vue: '*'}
  collectionPackageProperties.description = collectionPackageProperties.description.replace('. Designed for', ' for Vue. Designed for')
  collectionPackageProperties.keywords.push('vue')

  await createPackageJson({
    properties: collectionPackageProperties,
    dist: packageDist
  })


  // README.md
  const readmeParts = collectionToReadmeParts({collection, name: packageName})
  readmeParts.title += ' for Vue'

  await createReadme({properties: readmeParts, dist: packageDist})

  // Vue components
  await createVueComponents({
    collection, dist: packageDist
  })
});


