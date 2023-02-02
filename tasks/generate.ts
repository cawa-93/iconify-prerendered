import {
  IconifyJSON,
  lookupCollection,
  lookupCollections,
} from "../npm-deps.ts";
import { writeAllSync } from "https://deno.land/std@0.167.0/streams/write_all.ts";
import { VueGenerator } from "../generators/VueGenerator.ts";
import { emptyDir } from "https://deno.land/std@0.171.0/fs/empty_dir.ts";
import { PackageJson } from "../utils/pkg-type.ts";
import { render } from "https://deno.land/x/eta@v1.11.0/mod.ts";
import { getComponentName } from "../utils/getComponentName.ts";

const OUTPUT = new URL("../generated/", import.meta.url);

const VERSION = (Deno.args[0] || "0.0").split(".").slice(0, 2).join(".");
const README_TEMPLATE = Deno.readTextFileSync(
  new URL(import.meta.resolve(`../README.npm.md`)),
);

function getDescription(collection: Pick<IconifyJSON, "info" | "prefix">) {
  return `${
    collection.info?.name || collection.prefix
  } components. Designed for ease of use and high performance`;
}

function getPackageJson<F extends PackageJson>(
  collection: Omit<IconifyJSON, "icons" | "aliases">,
  fields: F,
) {
  return {
    description: getDescription(collection),
    type: "module",
    main: "./index.js",
    types: "./index.d.ts",
    version: `${VERSION}.${collection.lastModified || 0}`,
    license: collection.info?.license.spdx,
    funding: "https://www.buymeacoffee.com/kozack/",
    sideEffects: false,
    bugs: "https://github.com/cawa-93/iconify-prerendered/issues",
    homepage: "https://github.com/cawa-93/iconify-prerendered/",
    repository: "https://github.com/cawa-93/iconify-prerendered/",

    ...fields,

    exports: typeof fields.exports === "string" ? fields.exports : {
      ".": {
        "import": {
          "types": "./index.d.ts",
          "default": "./index.js",
        },
      },
      ...fields.exports || {},
    },
    author: typeof fields.author === "string" ? fields.author : {
      "name": "Alex Kozack",
      "url": "https://kozack.me",
      ...fields.author || {},
    },
    keywords: [
      "components",
      "icons",
      "iconify",
      collection.prefix,
      collection.info?.name || "",
      ...fields.keywords || [],
    ],
  } as const satisfies Readonly<PackageJson>;
}

/**
 * Needs to output log but without new line
 */
const textEncoder = new TextEncoder();

const generator = new VueGenerator(false);

async function generate(prefix: string) {
  writeAllSync(Deno.stdout, textEncoder.encode(`Generating ${prefix} ...`));

  const startTime = performance.now();

  try {
    const collection = await lookupCollection(prefix);
    const pkgName = `vue-${prefix}`;
    const pkgDir = new URL(`${pkgName}/`, OUTPUT);

    await emptyDir(pkgDir);

    // JavaScript
    const { implementation, type } = generator.generate(collection);
    await Deno.writeTextFile(new URL("index.js", pkgDir), implementation);
    await Deno.writeTextFile(new URL("index.d.ts", pkgDir), type);

    // package.json
    const pkg = getPackageJson(collection, {
      name: `@iconify-prerendered/${pkgName}`,
      keywords: ["vue"],
      description: getDescription(collection).replace(
        "components",
        "components for Vue",
      ),
      peerDependencies: {
        vue: "^3.0.0",
      },
    });

    await Deno.writeTextFile(
      new URL("package.json", pkgDir),
      JSON.stringify(pkg),
    );

    // README.md
    const content = await render(README_TEMPLATE, {
      pkgName,
      collection,
      sampleComponents: (collection.info?.samples || []).map(getComponentName),
    }, {
      async: true,
      cache: true,
      name: "readme",
      filename: "README.md",
    });

    if (typeof content !== "string") {
      throw new Error("README content is not a string.");
    }

    await Deno.writeTextFile(new URL(`README.md`, pkgDir), content);

    console.log(
      ` %cok %c(${Math.round(performance.now() - startTime)}ms)`,
      "color: green",
      "color: gray",
    );
  } catch (e) {
    console.log(
      ` %cfail %c(${Math.round(performance.now() - startTime)}ms)`,
      "color: red",
      "color: gray",
    );
    throw e;
  }
}

const TO_GENERATE = Deno.args[1]
  ? [...Deno.args[1].split(" ")]
  : Object.keys(await lookupCollections());
for (const prefix of TO_GENERATE) {
  await generate(prefix);
}
