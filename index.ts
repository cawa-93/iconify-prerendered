/**
 * TODO:
 * [x] parse all iconify collections
 * - for each collection:
 * [x] create package.json
 * [x] create readme
 * -- create license (?)
 * [x] write tests
 * - publish script
 * - write docs
 * - auto-updates
 */

import {lookupCollection, lookupCollections} from './npm-deps.ts'
import {resolve} from "https://deno.land/std@0.167.0/path/mod.ts";
import {BuilderVue} from "./builders/BuilderVue.ts";


for (const prefix in await lookupCollections()) {
    console.log(`Building ${prefix}...`)

    const pkgName = `vue-${prefix}`
    const output = resolve(Deno.cwd(), 'dist', pkgName)
    const collection = await lookupCollection(prefix)

    await (new BuilderVue({
        collection,
        output,
        name: `@iconify-prerendered/${pkgName}`
    }))
        .build()
}
