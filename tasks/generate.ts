import { lookupCollection, lookupCollections } from '../npm-deps.ts';
import { writeAllSync } from 'https://deno.land/std@0.176.0/streams/write_all.ts';
import { emptyDir } from 'https://deno.land/std@0.176.0/fs/empty_dir.ts';
import { parse } from 'https://deno.land/std@0.176.0/flags/mod.ts';
import { render } from 'https://deno.land/x/eta@v1.11.0/mod.ts';
import { VueGenerator } from '../generators/VueGenerator.ts';
import { getComponentName } from '../utils/getComponentName.ts';
import { getDescription } from '../utils/getDescription.ts';
import { getPackageJson } from '../utils/getPackageJson.ts';
import { join, toFileUrl } from 'https://deno.land/std@0.176.0/path/mod.ts';

const flags = parse(Deno.args, {
  negatable: ['replace-ids'],
  boolean: ['replace-ids'],
  string: ['version', 'output'],
  collect: ['prefix'],
  alias: {
    prefix: 'p',
    output: 'o',
    version: 'v',
  },
  default: {
    'replace-ids': true,
    version: '0.0',
    output: '/generated',
  },
});

if (flags.version === '0.0') {
  try {
    flags.version = JSON.parse(
      Deno.readTextFileSync(join(Deno.cwd(), 'generating.config.json')),
    ).version;
  } catch (e) {
    console.error(e);
  }
}

const OUTPUT = toFileUrl(join(Deno.cwd(), flags.output, '/'));
await emptyDir(OUTPUT);

const README_TEMPLATE = Deno.readTextFileSync(
  new URL(import.meta.resolve(`../README.npm.md`)),
);

/**
 * Needs to output log but without new line
 */
const textEncoder = new TextEncoder();

const generator = new VueGenerator(flags['replace-ids']);

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
    await Deno.writeTextFile(new URL('index.js', pkgDir), implementation);
    await Deno.writeTextFile(new URL('index.d.ts', pkgDir), type);

    // package.json
    const pkg = getPackageJson(collection, flags.version, {
      name: `@iconify-prerendered/${pkgName}`,
      keywords: ['vue'],
      description: getDescription(collection).replace(
        'components',
        'components for Vue',
      ),
      peerDependencies: {
        vue: '^3.0.0',
      },
    });

    await Deno.writeTextFile(
      new URL('package.json', pkgDir),
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
      name: 'readme',
      filename: 'README.md',
    });

    if (typeof content !== 'string') {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('README content is not a string.');
    }

    await Deno.writeTextFile(new URL(`README.md`, pkgDir), content);

    console.log(
      ` %cok %c(${Math.round(performance.now() - startTime)}ms)`,
      'color: green',
      'color: gray',
    );
  } catch (e) {
    console.log(
      ` %cfail %c(${Math.round(performance.now() - startTime)}ms)`,
      'color: red',
      'color: gray',
    );
    throw e;
  }
}

const TO_GENERATE = flags.prefix && flags.prefix.length
  ? flags.prefix
  : Object.keys(await lookupCollections());

for (const prefix of TO_GENERATE) {
  await generate(String(prefix));
}
