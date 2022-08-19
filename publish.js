import npmPublish from "@jsdevtools/npm-publish";
import fs from 'node:fs'

const packages = fs.readdirSync('./dist').map(d => `./dist/${d}`)
for (const pack of packages) {
  await npmPublish({
    package: `${pack}/package.json`,
    access: 'public',
    checkVersion: true,
    token: process.env.NPM_TOKEN,
  })
}
