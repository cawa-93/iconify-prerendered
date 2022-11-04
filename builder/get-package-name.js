
export const ORG_SCOPE = '@iconify-prerendered'

/**
 *
 * @param {string} collectionPrefix
 * @param {string} framework
 * @return {string}
 */
export function getPackageName(collectionPrefix, framework) {
  return `${ORG_SCOPE}/${framework}-${collectionPrefix}`
}
