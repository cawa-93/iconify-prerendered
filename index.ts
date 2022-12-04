/**
 * TODO:
 *
 * - [x] parse all iconify collections
 * - [ ] for each collection:
 * - [x] create package.json
 * - [x] create readme
 * - [ ] create license (?)
 * - [x] write tests
 * - [ ] publish script
 * - [x] write docs
 * - [ ] auto-updates
 * - - Auto-update packages in readme
 * - - Auto-update dependencies
 * - [ ] CI
 */

import {lookupCollection, lookupCollections} from './npm-deps.ts'
import {BuilderVue} from "./builders/BuilderVue.ts";
import {writeAllSync} from "https://deno.land/std@0.167.0/streams/write_all.ts";

const textEncoder = new TextEncoder()

for (const prefix in await lookupCollections()) {
    writeAllSync(Deno.stdout, textEncoder.encode(`Building ${prefix} ...`))

    const startTime = performance.now()

    const pkgName = `vue-${prefix}`
    const output = import.meta.resolve(`./dist/${pkgName}/`)
    const collection = await lookupCollection(prefix)

    await (new BuilderVue({
        collection,
        output,
        name: `@iconify-prerendered/${pkgName}`
    }))
        .build()

    const endTime = performance.now()

    console.log(` %cok %c(${Math.round(endTime - startTime)}ms)`, "color: green", "color: gray")
}

