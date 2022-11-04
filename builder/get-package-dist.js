import path from "node:path";
import {ORG_SCOPE} from "./get-package-name.js";

export const DIST_ROOT = 'dist'


/**
 *
 * @param {string} packageName
 * @return {string}
 */
export function getPackageDist(packageName) {
  return path.resolve(packageName.replace(ORG_SCOPE, DIST_ROOT))
}
