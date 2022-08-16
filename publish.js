import npmPublish from "@jsdevtools/npm-publish";
import fs from 'node:fs'

const packages = fs.readdirSync('./dist').map(d => `./dist/${d}`)
for (const pack of packages) {
  await fs.promises.copyFile('./README.md', `${pack}/README.md`, fs.constants.COPYFILE_FICLONE)
  await npmPublish({
    package: `${pack}/package.json`,
    access: 'public',
    checkVersion: true,
    token: process.env.NPM_TOKEN,
  })
}
