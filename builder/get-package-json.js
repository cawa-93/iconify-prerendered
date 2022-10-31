import fs from "node:fs";

export function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}));
}
