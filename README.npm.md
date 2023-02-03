# <%= it.collection.info?.name || it.collection.prefix %> components for Vue

Designed for ease of use and high performance. Each icon in set is standalone
component.

## Features

- **Easy to use**
  - No plugins required! Compatible with any build tools.
  - Zero dependencies.
  - SSR / SSG friendly.
  - TypeScript support.
- **High performance**
  - Does not require any external resources like fonts, css, images.
  - The icon code is embedded in your bundle.
  - Supports tree shaking, so only those icons that you have used will be
    included in the bundle.
  - Works offline.
- Powered by [iconify](https://iconify.design/).

## Usage

```vue
<script setup>
// Import components as usual
import {
<%= it.sampleComponents.map(s => '\t'+s+',\n').join('') %>
} from '<%= it.pkgName %>'
</script>

<template>
	<!-- And just use it in template -->
  <%~ it.sampleComponents.map(s => '\t<'+s+'/>\n').join('') %>
</template>
```

Only these three icons will be included in your bundle. All other icons may be
tree-shaken by your bundler.

That's all you need. No plugins, extra configs, IDE extensions or something
else.
[It just works](https://twitter.com/alex_kozack/status/1560608558127140865).

See [full docs](https://github.com/cawa-93/iconify-prerendered/#readme) or
[other available icons sets](https://github.com/cawa-93/iconify-prerendered/#available-icons-sets).
