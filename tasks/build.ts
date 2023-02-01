/**
 * TODO:
 *
 * - [x] parse all iconify collections
 * - [ ] for each collection:
 * - [ ] create package.json
 * - [ ] create readme
 * - [ ] create license (?)
 * - [ ] write tests
 * - [ ] publish script
 * - [ ] write docs
 * - [ ] auto-updates
 * - - Auto-update packages in readme
 * - - Auto-update dependencies
 * - [ ] CI
 */

import type {IconifyJSON} from '../npm-deps.ts'
import {writeAllSync} from "https://deno.land/std@0.167.0/streams/write_all.ts";
import {build} from 'https://deno.land/x/dnt/mod.ts';
import {PackageJson} from "../utils/pkg-type.ts";


const VERSION = (Deno.args[0] || '0.0').split('.').slice(0,2).join('.')

const INPUT = import.meta.resolve(`../generated/sources/`)
const OUTPUT = import.meta.resolve(`../generated/npm/`)

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

for (const {name, isDirectory} of Deno.readDirSync(new URL(INPUT))) {
    if (!isDirectory) {
        continue
    }

    writeAllSync(Deno.stdout, textEncoder.encode(`Building ${name} ...`))

    const startTime = performance.now()

    try {
        await buildNpmCollection(name)

        // await (new BuilderVue({
        //     collection: collection,
        //     output: new URL(`${pkgName}/`, OUTPUT),
        //     name: `@iconify-prerendered/${pkgName}`
        // }))
        //     .build()

        console.log(` %cok %c(${Math.round(performance.now() - startTime)}ms)`, "color: green", "color: gray")
        break
    } catch (e) {
        console.log(` %cfail %c(${Math.round(performance.now() - startTime)}ms)`, "color: red", "color: gray")
        throw e
    }
}


async function buildNpmCollection(name: string) {
    const inputDir = new URL(`${name}/.collection`, INPUT);
    const outputDir = new URL(`${name}/`, OUTPUT);
    const collection: Omit<IconifyJSON, 'icons' | 'aliases'> = JSON.parse(Deno.readTextFileSync(inputDir))
    const pkgName = `@iconify-prerendered/${name}`

    await build({
        entryPoints: [new URL('index.ts', inputDir).href],
        outDir: outputDir.href,
        test: false, // TODO
        scriptModule: 'cjs',
        skipSourceOutput: true,
        shims: {},
        package: getPackageJson(collection, {
            name: pkgName,
            keywords: ['vue'],
            description: getDescription(collection).replace('components', 'components for Vue')
        }),
        mappings: {
            'https://vue@latest': { // FIXME: temp workaround https://github.com/denoland/dnt/issues/250
                name: 'vue',
                peerDependency: true,
                version: '^3.0.0',
            }
        }
    })
}

function getDescription(collection: Pick<IconifyJSON, "info" | "prefix">) {
    return `${collection.info?.name || collection.prefix} components. Designed for ease of use and high performance`;
}

function getPackageJson<F extends PackageJson>(collection: Omit<IconifyJSON, 'icons' | 'aliases'>, fields: F) {

    return {
        description: getDescription(collection),
        type: 'module',
        version: `${VERSION}.${collection.lastModified || 0}`,
        license: collection.info?.license.spdx,
        funding:"https://www.buymeacoffee.com/kozack/",
        sideEffects: false,
        bugs: 'https://github.com/cawa-93/iconify-prerendered/issues',
        homepage: 'https://github.com/cawa-93/iconify-prerendered/',
        repository: 'https://github.com/cawa-93/iconify-prerendered/',

        ...fields,

        author: typeof fields.author === 'string' ? fields.author : {
            "name": "Alex Kozack",
            "url": "https://kozack.me",
            ...fields.author || {}
        },
        keywords: [
            "components",
            "icons",
            "iconify",
            collection.prefix,
            collection.info?.name || '',
            ...fields.keywords || [],
        ]
    } as const satisfies Readonly<PackageJson>;

}
