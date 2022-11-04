import {lookupCollection, lookupCollections} from "@iconify/json";

/**
 *
 * @param {(collection: import('@iconify/types').IconifyJSON) => void} callback
 * @return {Promise<void>}
 */
export async function forEachIconsCollection(callback) {
  for (const collectionName in await lookupCollections()) {
    console.log(`Rendering ${collectionName}`)
    await lookupCollection(collectionName).then(callback)
  }
}
