import {lookupCollections} from "@iconify/json";

/**
 *
 * @param {(collection: string) => void} callback
 * @return {Promise<void>}
 */
export async function forEachIconsCollection(callback) {
  for (const collectionName in await lookupCollections()) {
    console.log(`Rendering ${collectionName}`)
    await callback(collectionName)
  }
}
