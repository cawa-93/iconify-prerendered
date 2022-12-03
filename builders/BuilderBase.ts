import type {IconifyJSON} from '../npm-deps.ts'
import {resolve} from "https://deno.land/std@0.167.0/path/mod.ts";
import {ensureDir} from "https://deno.land/std@0.167.0/fs/mod.ts";
import {PackageJson} from "../utils/pkg-type.ts";

export interface Builder {
    build(collection: IconifyJSON): void | Promise<void>
}

export class BuilderBase implements Builder {
    readonly output: string;
    readonly collection: IconifyJSON;
    readonly name: string;

    constructor({collection, output, name}: { readonly collection: IconifyJSON, readonly output: string, name: string}) {
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
    private async writeFile(filename: string, content: string) {
        await ensureDir(this.output)
        return Deno.writeTextFile(resolve(this.output, filename), content)
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

    createReadme() {
        return this.writeFile('README.md', '# Hello');
    }

    async renderCollection() {
        await this.writeFile('index.js', '// not implemented');
        await this.writeFile('index.d.ts', '// not implemented');

    }

    async build() {
        await Promise.all([
            this.createReadme(),
            this.writePackageJson(),
            this.renderCollection()
        ])

    }
}
