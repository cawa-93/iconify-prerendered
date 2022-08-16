import npmPublish from "@jsdevtools/npm-publish";
import fs from 'node:fs'

const packages = fs.readdirSync('./dist').map(d => `./dist/${d}/package.json`)
for (const pack of packages) {
    await npmPublish({
        package: pack,
        access: 'public',
        checkVersion: true,
        token: process.env.NPM_TOKEN,
    })
}
