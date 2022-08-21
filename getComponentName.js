import {camelize} from "@iconify/utils";
import {capitalize} from "./utils.js";

/**
 * The names of some icons cannot be automatically resolved to valid component names so that they do not conflict with other components.
 * For such cases, individual conversion rules apply
 * @type {Map<string, string>}
 */
const specialCases = new Map([
  ['menu-alt-2', 'IconMenuAltDash2'] // dashicon/menu-alt-2 will be resolved as `IconMenuAlt2` but it's alias for `IconMenuAlt3`
])

export function getComponentName(iconName) {
  if (specialCases.has(iconName)) {
    return specialCases.get(iconName)
  }

  let name = capitalize(camelize(`icon${iconName.startsWith('-') ? iconName : `-${iconName}`}`));
  if (name.endsWith('-')) {
    name = name.replace(/-$/, 'Minus')
  }
  return name
}
