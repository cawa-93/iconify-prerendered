import {readdirSync} from 'fs'
import * as path from "path";
import {DIST_ROOT} from "../builder/get-package-dist.js";
import {test} from "@japa/runner";
import fs from "node:fs";
import {ORG_SCOPE} from "../builder/get-package-name.js";


const packages =
  readdirSync(DIST_ROOT, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


test('Should have valid package.json in {$self}')
  .with(packages)
  .run(async ({assert}, packageName) => {
    const content = JSON.parse(
      await fs.promises.readFile(path.resolve(DIST_ROOT, packageName, 'package.json'), {encoding: 'utf8'})
    )

    assert.equal(content.name, `${ORG_SCOPE}/${packageName}`)
  })
