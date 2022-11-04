import {readdirSync} from 'fs'
import * as path from "path";
import {DIST_ROOT} from "../builder/get-package-dist.js";
import {test} from "@japa/runner";
import fs from "node:fs";


function isFileExist(filepath) {
  return fs.promises.access(filepath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}


const packages =
  readdirSync(DIST_ROOT, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


test('Should have not-empty README in {$self}')
  .with(packages)
  .run(async ({assert}, packageName) => {
    const isEmpty = await fs.promises
      .readFile(path.resolve(DIST_ROOT, packageName, 'README.md'), {encoding: 'utf8'})
      .then((content) => content.trim().length === 0)
    assert.isFalse(isEmpty)
  })
