import {Builder} from "./builder.js";
import {IconifyIconBuildResult} from "@iconify/utils/lib/svg/build";
import {IconifyJSON} from "@iconify/types";
import {getComponentName} from "./getComponentName.js";

class VueBuilder extends Builder {
  framework = 'vue';

  componentImplementation(svg: IconifyIconBuildResult): string {
    const props = {
      ...svg.attributes,
      innerHTML: svg.body
    }
    return `() => h('svg', ${JSON.stringify(props)})`;
  }

  componentTypeDeclaration(svg: IconifyIconBuildResult): string {
    return 'DefineComponent<{}, {}, any>';
  }

  generatePackageJson(collection: IconifyJSON) {
    const pack = super.generatePackageJson(collection)
    pack.keywords.push('vue')
    // @ts-ignore
    pack.peerDependencies = {
      vue: '*'
    }
    return pack
  }

  generateReadme(collection: IconifyJSON): string {
    const packageJsonBase = this.generatePackageJson(collection)
    return `
# ${collection.info.name} components for Vue. Designed for ease of use and high performance


Each icon in set is standalone component.

## Features
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

## Usage
\`\`\`vue
<script setup>
// Import components as usual
import {
    ${collection.info.samples.map(getComponentName).join(',\n    ')}
} from '@iconify-prerendered/vue-${collection.prefix}'
</script>

<template>
  <!-- And just use it in template -->
  ${
      collection.info.samples.map(getComponentName).map(name => `<${name}/>`).join('\n  ')
    }
</template>
\`\`\`

Only these three icons will be included in your bundle. All other icons may be tree-shaken by your bundler.

That's all you need. No plugins, extra configs, IDE extensions or something else. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).

See [full docs](${packageJsonBase.homepage}#readme) or [other available icons sets](${packageJsonBase.homepage}#available-icons-sets).
`;
  }

  joinImplementations(implementations: string[]): string {
    return `import {h} from 'vue';\n${implementations.join('\n')}`;
  }

  joinTypeDeclarations(typeDeclarations: string[]): string {
    return `import type {DefineComponent} from 'vue';\n${typeDeclarations.join('\n')}`;
  }
}


await new VueBuilder().buildAllCollections()
