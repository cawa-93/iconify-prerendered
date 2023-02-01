import {lookupCollection, lookupCollections} from '../npm-deps.ts'
import {writeAllSync} from "https://deno.land/std@0.167.0/streams/write_all.ts";
import {Generator} from "../builders/Generator.ts";
import {ensureDir} from "https://deno.land/std@0.167.0/fs/mod.ts";

const OUTPUT = import.meta.resolve(`../generated/sources/`)

// Try to remove previous build or ignore error if that doesn't exist
try {
    await Deno.remove(new URL(OUTPUT), {
        recursive: true
    })
} catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) {
        throw e
    }
}

/**
 * Needs to output log but without new line
 */
const textEncoder = new TextEncoder()

const generator = new Generator(true)

for (const prefix in await lookupCollections()) {
    writeAllSync(Deno.stdout, textEncoder.encode(`Building ${prefix} ...`))

    const startTime = performance.now()

    try {
        const collection = await lookupCollection(prefix);
        const pkgName = `vue-${prefix}`
        const pkgDir = new URL(`${pkgName}/`, OUTPUT);

        await ensureDir(pkgDir)

        const code = generator.generate(collection)
        await Deno.writeTextFile(new URL('index.ts', pkgDir), code)

        await Deno.writeTextFile(new URL('.collection', pkgDir), JSON.stringify({
            ...collection,
            icons: undefined,
            aliases: undefined
        }))


        console.log(` %cok %c(${Math.round(performance.now() - startTime)}ms)`, "color: green", "color: gray")
    } catch (e) {
        console.log(` %cfail %c(${Math.round(performance.now() - startTime)}ms)`, "color: red", "color: gray")
        throw e
    }
}

