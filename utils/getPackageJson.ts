import { PackageJson } from './pkg-type.ts';
import { IconifyJSON } from '../npm-deps.ts';
import { getDescription } from './getDescription.ts';

export function getPackageJson<F extends PackageJson>(
  collection: Omit<IconifyJSON, 'icons' | 'aliases'>,
  baseVersion = '0.0',
  fields: F,
) {
  return {
    description: getDescription(collection),
    type: 'module',
    main: 'index.js',
    types: 'index.d.ts',
    version: `${baseVersion}.${collection.lastModified || 0}`,
    license: collection.info?.license.spdx,
    funding: 'https://www.buymeacoffee.com/kozack/',
    sideEffects: false,
    bugs: 'https://github.com/cawa-93/iconify-prerendered/issues',
    homepage: 'https://github.com/cawa-93/iconify-prerendered/',
    repository: 'https://github.com/cawa-93/iconify-prerendered/',

    ...fields,

    exports: typeof fields.exports === 'string' ? fields.exports : {
      '.': {
        'import': {
          'types': './index.d.ts',
          'default': './index.js',
        },
      },
      ...fields.exports || {},
    },
    author: typeof fields.author === 'string' ? fields.author : {
      'name': 'Alex Kozack',
      'url': 'https://kozack.me',
      ...fields.author || {},
    },
    keywords: [
      'components',
      'icons',
      'iconify',
      collection.prefix,
      collection.info?.name || '',
      ...fields.keywords || [],
    ],
  } as const satisfies Readonly<PackageJson>;
}
