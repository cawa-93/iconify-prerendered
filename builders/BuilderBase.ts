import type {IconifyJSON} from '../npm-deps.ts'
import {camelize} from '../npm-deps.ts'
import {ensureDir} from "https://deno.land/std@0.167.0/fs/mod.ts";
import {PackageJson} from "../utils/pkg-type.ts";
import {capitalize} from "../utils/capitalize.ts";
import outdent from 'http://deno.land/x/outdent/mod.ts';

export interface Builder {
    build(collection: IconifyJSON): void | Promise<void>
}

export class BuilderBase implements Builder {
    readonly output: string | URL;
    readonly collection: IconifyJSON;
    readonly name: string;

    constructor({collection, output, name}: {
        readonly collection: IconifyJSON,
        readonly output: string | URL,
        readonly name: string
    }) {
        this.output = output
        this.collection = collection
        this.name = name
    }

    /**
     * Write `content` to `filename` in output dir
     * @param filename
     * @param content
     * @private
     */
    public async writeFile(filename: string, content: string) {
        await ensureDir(new URL(this.output))
        return Deno.writeTextFile(
            new URL(filename, this.output),
            content
        )
    }


    public static getComponentName(iconName: string): string {
        /**
         * The names of some icons cannot be automatically resolved to valid component names so that they do not conflict with other components.
         * For such cases, individual conversion rules apply
         * @type {Map<string, string>}
         */
        const specialCases = new Map([
            ['menu-alt-2', 'IconMenuAltDash2'] // dashicon/menu-alt-2 will be resolved as `IconMenuAlt2` but it's alias for `IconMenuAlt3`
        ])

        const specialCase = specialCases.get(iconName)
        if (specialCase) {
            return specialCase
        }

        let name = capitalize(camelize(`icon${iconName.startsWith('-') ? iconName : `-${iconName}`}`));
        if (name.endsWith('-')) {
            name = name.replace(/-$/, 'Minus')
        }
        return name
    }


    public get packageJsonObject(): PackageJson {
        return {
            name: this.name,
            description: `${this.collection.info?.name || this.collection.prefix} components. Designed for ease of use and high performance`,
            type: 'module',
            main: './index.js',
            types: './index.d.ts',
            // TODO: Implement versioning
            version: `0.0.${this.collection.lastModified || 0}`,
            license: this.collection.info?.license.spdx,
            sideEffects: false,
            author: {
                "name": "Alex Kozack",
                "url": "https://kozack.me"
            },
            bugs: 'https://github.com/cawa-93/iconify-prerendered/issues',
            homepage: 'https://github.com/cawa-93/iconify-prerendered/',
            repository: 'https://github.com/cawa-93/iconify-prerendered/',
            keywords: [
                "components",
                "icons",
                "iconify",
                this.collection.prefix,
                this.collection.info?.name || '',
            ]
        };
    }

    async writePackageJson() {
        return await this.writeFile('package.json', JSON.stringify(this.packageJsonObject));
    }

    get readmeText(): string {
        const title = `Prerendered ${this.collection.info?.name || this.collection.prefix}`
        const description = 'Designed for ease of use and high performance. Each icon in set is standalone component.'
        const features = outdent`
            - **Easy to use**
              - No plugins required! Compatible with any build tools.
              - Zero dependencies.
              - SSR / SSG friendly.
              - TypeScript support.
            - **High performance**
              - Does not require any external resources like fonts, css, images.
              - The icon code is embedded in your bundle.
              - Supports tree shaking, so only those icons that you have used will be included in the bundle.
              - Works offline.
            - Powered by [iconify](https://iconify.design/).
        `
        const usage = '<!-- USAGE NOT IMPLEMENTED -->'
        const usageNote = 'Only these three icons will be included in your bundle. All other icons may be tree-shaken by your bundler.'
        const afterwords = outdent`
            That's all you need. No plugins, extra configs, IDE extensions or something else. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).
            
            See [full docs](${this.packageJsonObject.homepage}#readme) or [other available icons sets](${this.packageJsonObject.homepage}#available-icons-sets).
        `

        return outdent`
            # ${title}
        
            ${description}
            
            ## Features
            ${features}
            
            ## Usage
            ${usage}
            ${usageNote}
            
            ${afterwords}
        `
    }

    writeReadme() {
        return this.writeFile('README.md', this.readmeText);
    }

    async renderCollection() {
        await this.writeFile('index.js', '// not implemented');
        await this.writeFile('index.d.ts', '// not implemented');

    }

    async build() {
        await Promise.all([
            // this.writeReadme(),
            // this.writePackageJson(),
            this.renderCollection()
        ])

    }
}
