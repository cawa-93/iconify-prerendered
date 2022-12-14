import {lookupCollection, lookupCollections} from '@iconify/json';
import * as fs from "node:fs";

const {format} = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

const packages = []
for (const collectionName in await lookupCollections()) {
  const {info, lastModified} = await lookupCollection(collectionName)
  const iconUrl = `https://icon-sets.iconify.design/${collectionName}`
  packages.push({
    name: info.name,
    url: iconUrl,
    package: `@iconify-prerendered/vue-${collectionName}`,
    lastModified: new Date(lastModified * 1000),
  })
}
let packList = '| Icon set | Package | Last modified |\n| --- | --- | --- |\n'
  + packages
    .sort(function(p1, p2){
      const name1 = p1.name.toLowerCase()
      const name2 = p2.name.toLowerCase()
      if(name1 < name2) { return -1; }
      if(name1 > name2) { return 1; }
      return 0;
    })
    .reduce((s, pack) => {
      return s + `|\t[${pack.name}](${pack.url}) | \`${pack.package}\`\t|\t${format(pack.lastModified)}\t|\n`
    }, '')


const readmePath = './README.md'
const readme = fs.readFileSync(readmePath, {encoding: 'utf8'})
fs.writeFileSync(readmePath, readme.replace(/<!-- PACKAGE LIST START -->(.|\n)*<!-- PACKAGE LIST END -->/m, `<!-- PACKAGE LIST START -->\n${packList}\n<!-- PACKAGE LIST END -->`))
