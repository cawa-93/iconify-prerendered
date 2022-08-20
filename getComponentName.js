import {camelize} from "@iconify/utils";
import {capitalize} from "./utils.js";

export function getComponentName(iconName) {
  let name = capitalize(camelize(`icon${iconName.startsWith('-') ? iconName : `-${iconName}`}`));
  if (name.endsWith('-')) {
    name = name.replace(/-$/, 'Minus')
  }
  return name
}
