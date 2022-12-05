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

import {lookupCollection, lookupCollections} from '../npm-deps.ts'
import {BuilderVue} from "../builders/BuilderVue.ts";
import {writeAllSync} from "https://deno.land/std@0.167.0/streams/write_all.ts";

const OUTPUT = import.meta.resolve(`../dist/`)

const textEncoder = new TextEncoder()

for (const prefix in await lookupCollections()) {
    writeAllSync(Deno.stdout, textEncoder.encode(`Building ${prefix} ...`))

    const startTime = performance.now()

    try {

        const pkgName = `vue-${prefix}`

        await (new BuilderVue({
            collection: await lookupCollection(prefix),
            output: new URL(`${pkgName}/`, OUTPUT),
            name: `@iconify-prerendered/${pkgName}`
        }))
            .build()

        console.log(` %cok %c(${Math.round(performance.now() - startTime)}ms)`, "color: green", "color: gray")
    } catch (e) {
        console.log(` %cfail %c(${Math.round(performance.now() - startTime)}ms)`, "color: red", "color: gray")
        throw e
    }
}

