> **Important**
>
> This project is maintained by **developer from Ukraine** 🇺🇦
>
> Due to the ongoing war resulting from Russia's full-scale invasion of Ukraine,
> I currently lack the time for the full development of this open-source
> project. My primary focus is on ensuring the well-being of myself and my
> family.
>
> I'll prioritize and review all new contributions as soon as possible.
>
> If you can, please consider
> [supporting Ukraine](https://stand-with-ukraine.pp.ua/) or
> [me personally](https://www.buymeacoffee.com/kozack).
>
> Thank you for your understanding and support.

---

# <%= it.collection.info?.name || it.collection.prefix %> components for Vue

Designed for ease of use and high performance. Each icon in set is standalone
component.

## Features

- **Easy to use**
  - No plugins required! Compatible with any build tools.
  - Designed for best compatibility with IDE auto-completion
    ([Demo](https://twitter.com/alex_kozack/status/1560608558127140865)).
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

## Customizing icon default attributes

By default, all icons have only two attributes: `role="img"` and
`aria-hidden="true"`. While you are free to redefine these attributes or add new
ones for each individual icon, you might want to apply certain attributes, such
as `class` or `style`, to all icons within a set.

To achieve this, you can re-export icons through a `new Proxy` and include
default attributes

```javascript
import * as defaultIcons from '<%= it.pkgName %>';

// accessing to icon through this Proxy will add additional attributes
export const themedIcons = new Proxy({}, {
  get(_, iconKey) {
    return () =>
      defaultIcons[iconKey]({
        class: 'pre-defined-class',
        // ... any other attributes
      });
  },
});
```

See [full docs](https://github.com/cawa-93/iconify-prerendered/#readme) or
[other available icons sets](https://github.com/cawa-93/iconify-prerendered/#available-icons-sets).
