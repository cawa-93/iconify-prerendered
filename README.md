> [!NOTE]
>
> This project is mainrained by **developer from Ukraine** 🇺🇦
>
> Due to the ongoing war resulting from Russia's full-scale invasion of Ukraine,
> I currently lack the time for the full development of this open-source
> project. My primary focus is on ensuring the well-being of myself and my
> family. I'll prioritize and review all new contributions as soon as possible.
>
> If you can, please consider
> [supporting Ukraine](https://stand-with-ukraine.pp.ua/) or
> [me personally](https://www.buymeacoffee.com/kozack).
>
> Thank you for your understanding and support.

---

# @iconify-prerendered

A superset standalone icon-components for Vue with zero dependencies. Designed
for ease of use and high performance.

## Features

- **Easy to use**
  - No plugins required! Compatible with any build tools.
  - Designed for best compatibility with IDE auto-completion
    ([Demo](https://twitter.com/alex_kozack/status/1560608558127140865)).
  - Zero dependencies.
  - SSR / SSG friendly.
  - TypeScript support.
  - Unified API across all icon sets.
- **High performance**
  - Does not require any external resources like fonts, css, images.
  - The icon code is embedded in your bundle.
  - Supports tree shaking, so only those icons that you have used will be
    included in the bundle.
  - Works offline.
- Powered by [iconify](https://iconify.design/).

**Live demo**:
https://stackblitz.com/edit/iconify-prerendered-demo?file=src%2FApp.vue

## Installation

Install the appropriate icon set

```
npm i @iconify-prerendered/vue-<icon-set-name>

# Bootstrap Icons
npm i @iconify-prerendered/vue-bi

# Material Design Icons
npm i @iconify-prerendered/vue-mdi
```

## Usage

Just import icon-component from set like usual.

```vue
<script setup>
// Import two icons from Font Awesome Brands
import { IconVuejs, IconJs } from '@iconify-prerendered/vue-fa-brands';
// Import one Icon from Material Design icons
import { IconCardsHeart } from '@iconify-prerendered/vue-mdi';
</script>

<template>
  <p>
    <IconJs />
    <IconCardsHeart />
    <IconVuejs />
  </p>
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

```typescript
import * as defaultIcons from '@iconify-prerendered/vue-mdi';

// accessing to icon through this Proxy will add additional attributes
export const themedIcons = new Proxy({} as typeof defaultIcons, {
  get(_, iconKey: keyof typeof defaultIcons) {
    return () =>
      defaultIcons[iconKey]({
        class: 'pre-defined-class',
        // ... any other attributes
      });
  },
});
```

## Available icons sets

<!-- PACKAGE LIST START -->

| Icon set                                                                                  | Package                                               | Last modified |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| [Academicons](https://icon-sets.iconify.design/academicons)                               | `@iconify-prerendered/vue-academicons`                | Dec 11, 2023  |
| [Akar Icons](https://icon-sets.iconify.design/akar-icons)                                 | `@iconify-prerendered/vue-akar-icons`                 | Mar 22, 2024  |
| [Ant Design Icons](https://icon-sets.iconify.design/ant-design)                           | `@iconify-prerendered/vue-ant-design`                 | Apr 9, 2024   |
| [Arcticons](https://icon-sets.iconify.design/arcticons)                                   | `@iconify-prerendered/vue-arcticons`                  | May 23, 2024  |
| [Basil](https://icon-sets.iconify.design/basil)                                           | `@iconify-prerendered/vue-basil`                      | Dec 11, 2023  |
| [Bitcoin Icons](https://icon-sets.iconify.design/bitcoin-icons)                           | `@iconify-prerendered/vue-bitcoin-icons`              | Jan 4, 2024   |
| [Bootstrap Icons](https://icon-sets.iconify.design/bi)                                    | `@iconify-prerendered/vue-bi`                         | Jan 5, 2024   |
| [BoxIcons](https://icon-sets.iconify.design/bx)                                           | `@iconify-prerendered/vue-bx`                         | Dec 11, 2023  |
| [BoxIcons Logo](https://icon-sets.iconify.design/bxl)                                     | `@iconify-prerendered/vue-bxl`                        | Dec 11, 2023  |
| [BoxIcons Solid](https://icon-sets.iconify.design/bxs)                                    | `@iconify-prerendered/vue-bxs`                        | Dec 11, 2023  |
| [BPMN](https://icon-sets.iconify.design/bpmn)                                             | `@iconify-prerendered/vue-bpmn`                       | Dec 11, 2023  |
| [Brandico](https://icon-sets.iconify.design/brandico)                                     | `@iconify-prerendered/vue-brandico`                   | Dec 11, 2023  |
| [Bytesize Icons](https://icon-sets.iconify.design/bytesize)                               | `@iconify-prerendered/vue-bytesize`                   | Dec 11, 2023  |
| [Carbon](https://icon-sets.iconify.design/carbon)                                         | `@iconify-prerendered/vue-carbon`                     | May 23, 2024  |
| [Charm Icons](https://icon-sets.iconify.design/charm)                                     | `@iconify-prerendered/vue-charm`                      | Dec 11, 2023  |
| [Circle Flags](https://icon-sets.iconify.design/circle-flags)                             | `@iconify-prerendered/vue-circle-flags`               | Apr 4, 2024   |
| [Circum Icons](https://icon-sets.iconify.design/circum)                                   | `@iconify-prerendered/vue-circum`                     | Apr 22, 2024  |
| [Clarity](https://icon-sets.iconify.design/clarity)                                       | `@iconify-prerendered/vue-clarity`                    | Dec 11, 2023  |
| [Codicons](https://icon-sets.iconify.design/codicon)                                      | `@iconify-prerendered/vue-codicon`                    | May 17, 2024  |
| [coolicons](https://icon-sets.iconify.design/ci)                                          | `@iconify-prerendered/vue-ci`                         | Dec 11, 2023  |
| [CoreUI Brands](https://icon-sets.iconify.design/cib)                                     | `@iconify-prerendered/vue-cib`                        | Dec 11, 2023  |
| [CoreUI Flags](https://icon-sets.iconify.design/cif)                                      | `@iconify-prerendered/vue-cif`                        | Dec 11, 2023  |
| [CoreUI Free](https://icon-sets.iconify.design/cil)                                       | `@iconify-prerendered/vue-cil`                        | Dec 11, 2023  |
| [Covid Icons](https://icon-sets.iconify.design/covid)                                     | `@iconify-prerendered/vue-covid`                      | Dec 11, 2023  |
| [Cryptocurrency Color Icons](https://icon-sets.iconify.design/cryptocurrency-color)       | `@iconify-prerendered/vue-cryptocurrency-color`       | Dec 11, 2023  |
| [Cryptocurrency Icons](https://icon-sets.iconify.design/cryptocurrency)                   | `@iconify-prerendered/vue-cryptocurrency`             | Dec 11, 2023  |
| [css.gg](https://icon-sets.iconify.design/gg)                                             | `@iconify-prerendered/vue-gg`                         | Dec 11, 2023  |
| [Custom Brand Icons](https://icon-sets.iconify.design/cbi)                                | `@iconify-prerendered/vue-cbi`                        | May 17, 2024  |
| [Dashicons](https://icon-sets.iconify.design/dashicons)                                   | `@iconify-prerendered/vue-dashicons`                  | Dec 11, 2023  |
| [Devicon](https://icon-sets.iconify.design/devicon)                                       | `@iconify-prerendered/vue-devicon`                    | May 6, 2024   |
| [Devicon Plain](https://icon-sets.iconify.design/devicon-plain)                           | `@iconify-prerendered/vue-devicon-plain`              | May 6, 2024   |
| [Elegant](https://icon-sets.iconify.design/et)                                            | `@iconify-prerendered/vue-et`                         | Dec 11, 2023  |
| [Element Plus](https://icon-sets.iconify.design/ep)                                       | `@iconify-prerendered/vue-ep`                         | Mar 11, 2024  |
| [Elusive Icons](https://icon-sets.iconify.design/el)                                      | `@iconify-prerendered/vue-el`                         | Dec 11, 2023  |
| [Emoji One (Colored)](https://icon-sets.iconify.design/emojione)                          | `@iconify-prerendered/vue-emojione`                   | Dec 11, 2023  |
| [Emoji One (Monotone)](https://icon-sets.iconify.design/emojione-monotone)                | `@iconify-prerendered/vue-emojione-monotone`          | Dec 11, 2023  |
| [Emoji One (v1)](https://icon-sets.iconify.design/emojione-v1)                            | `@iconify-prerendered/vue-emojione-v1`                | Dec 11, 2023  |
| [Entypo+](https://icon-sets.iconify.design/entypo)                                        | `@iconify-prerendered/vue-entypo`                     | Dec 11, 2023  |
| [Entypo+ Social](https://icon-sets.iconify.design/entypo-social)                          | `@iconify-prerendered/vue-entypo-social`              | Dec 11, 2023  |
| [EOS Icons](https://icon-sets.iconify.design/eos-icons)                                   | `@iconify-prerendered/vue-eos-icons`                  | May 14, 2024  |
| [Eva Icons](https://icon-sets.iconify.design/eva)                                         | `@iconify-prerendered/vue-eva`                        | Dec 11, 2023  |
| [Evil Icons](https://icon-sets.iconify.design/ei)                                         | `@iconify-prerendered/vue-ei`                         | Dec 11, 2023  |
| [Feather Icon](https://icon-sets.iconify.design/fe)                                       | `@iconify-prerendered/vue-fe`                         | Dec 11, 2023  |
| [Feather Icons](https://icon-sets.iconify.design/feather)                                 | `@iconify-prerendered/vue-feather`                    | Dec 11, 2023  |
| [File Icons](https://icon-sets.iconify.design/file-icons)                                 | `@iconify-prerendered/vue-file-icons`                 | Dec 11, 2023  |
| [Firefox OS Emoji](https://icon-sets.iconify.design/fxemoji)                              | `@iconify-prerendered/vue-fxemoji`                    | Dec 11, 2023  |
| [Flag Icons](https://icon-sets.iconify.design/flag)                                       | `@iconify-prerendered/vue-flag`                       | May 23, 2024  |
| [Flagpack](https://icon-sets.iconify.design/flagpack)                                     | `@iconify-prerendered/vue-flagpack`                   | Jan 4, 2024   |
| [Flat Color Icons](https://icon-sets.iconify.design/flat-color-icons)                     | `@iconify-prerendered/vue-flat-color-icons`           | Dec 11, 2023  |
| [Flat UI Icons](https://icon-sets.iconify.design/flat-ui)                                 | `@iconify-prerendered/vue-flat-ui`                    | Dec 11, 2023  |
| [Flowbite Icons](https://icon-sets.iconify.design/flowbite)                               | `@iconify-prerendered/vue-flowbite`                   | Apr 25, 2024  |
| [Fluent Emoji](https://icon-sets.iconify.design/fluent-emoji)                             | `@iconify-prerendered/vue-fluent-emoji`               | Dec 11, 2023  |
| [Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat)                   | `@iconify-prerendered/vue-fluent-emoji-flat`          | Dec 11, 2023  |
| [Fluent Emoji High Contrast](https://icon-sets.iconify.design/fluent-emoji-high-contrast) | `@iconify-prerendered/vue-fluent-emoji-high-contrast` | Dec 18, 2023  |
| [Fluent UI MDL2](https://icon-sets.iconify.design/fluent-mdl2)                            | `@iconify-prerendered/vue-fluent-mdl2`                | Apr 7, 2024   |
| [Fluent UI System Icons](https://icon-sets.iconify.design/fluent)                         | `@iconify-prerendered/vue-fluent`                     | May 20, 2024  |
| [Font Awesome 4](https://icon-sets.iconify.design/fa)                                     | `@iconify-prerendered/vue-fa`                         | Dec 11, 2023  |
| [Font Awesome 5 Brands](https://icon-sets.iconify.design/fa-brands)                       | `@iconify-prerendered/vue-fa-brands`                  | Dec 11, 2023  |
| [Font Awesome 5 Regular](https://icon-sets.iconify.design/fa-regular)                     | `@iconify-prerendered/vue-fa-regular`                 | Dec 11, 2023  |
| [Font Awesome 5 Solid](https://icon-sets.iconify.design/fa-solid)                         | `@iconify-prerendered/vue-fa-solid`                   | Dec 11, 2023  |
| [Font Awesome Brands](https://icon-sets.iconify.design/fa6-brands)                        | `@iconify-prerendered/vue-fa6-brands`                 | Apr 4, 2024   |
| [Font Awesome Regular](https://icon-sets.iconify.design/fa6-regular)                      | `@iconify-prerendered/vue-fa6-regular`                | Apr 4, 2024   |
| [Font Awesome Solid](https://icon-sets.iconify.design/fa6-solid)                          | `@iconify-prerendered/vue-fa6-solid`                  | Apr 4, 2024   |
| [Font-GIS](https://icon-sets.iconify.design/gis)                                          | `@iconify-prerendered/vue-gis`                        | Apr 4, 2024   |
| [FontAudio](https://icon-sets.iconify.design/fad)                                         | `@iconify-prerendered/vue-fad`                        | Dec 11, 2023  |
| [Fontelico](https://icon-sets.iconify.design/fontelico)                                   | `@iconify-prerendered/vue-fontelico`                  | Dec 11, 2023  |
| [Fontisto](https://icon-sets.iconify.design/fontisto)                                     | `@iconify-prerendered/vue-fontisto`                   | Dec 11, 2023  |
| [FormKit Icons](https://icon-sets.iconify.design/formkit)                                 | `@iconify-prerendered/vue-formkit`                    | Apr 9, 2024   |
| [Foundation](https://icon-sets.iconify.design/foundation)                                 | `@iconify-prerendered/vue-foundation`                 | Dec 11, 2023  |
| [Framework7 Icons](https://icon-sets.iconify.design/f7)                                   | `@iconify-prerendered/vue-f7`                         | Jan 5, 2024   |
| [Gala Icons](https://icon-sets.iconify.design/gala)                                       | `@iconify-prerendered/vue-gala`                       | Nov 26, 2023  |
| [Game Icons](https://icon-sets.iconify.design/game-icons)                                 | `@iconify-prerendered/vue-game-icons`                 | Apr 7, 2024   |
| [GeoGlyphs](https://icon-sets.iconify.design/geo)                                         | `@iconify-prerendered/vue-geo`                        | Dec 11, 2023  |
| [Gitlab SVGs](https://icon-sets.iconify.design/pajamas)                                   | `@iconify-prerendered/vue-pajamas`                    | Apr 7, 2024   |
| [Google Material Icons](https://icon-sets.iconify.design/ic)                              | `@iconify-prerendered/vue-ic`                         | Dec 11, 2023  |
| [Gravity UI Icons](https://icon-sets.iconify.design/gravity-ui)                           | `@iconify-prerendered/vue-gravity-ui`                 | Feb 29, 2024  |
| [Gridicons](https://icon-sets.iconify.design/gridicons)                                   | `@iconify-prerendered/vue-gridicons`                  | Dec 11, 2023  |
| [Grommet Icons](https://icon-sets.iconify.design/grommet-icons)                           | `@iconify-prerendered/vue-grommet-icons`              | Dec 11, 2023  |
| [Guidance](https://icon-sets.iconify.design/guidance)                                     | `@iconify-prerendered/vue-guidance`                   | Dec 11, 2023  |
| [Health Icons](https://icon-sets.iconify.design/healthicons)                              | `@iconify-prerendered/vue-healthicons`                | Apr 29, 2024  |
| [HeroIcons](https://icon-sets.iconify.design/heroicons)                                   | `@iconify-prerendered/vue-heroicons`                  | Apr 29, 2024  |
| [HeroIcons v1 Outline](https://icon-sets.iconify.design/heroicons-outline)                | `@iconify-prerendered/vue-heroicons-outline`          | Dec 11, 2023  |
| [HeroIcons v1 Solid](https://icon-sets.iconify.design/heroicons-solid)                    | `@iconify-prerendered/vue-heroicons-solid`            | Dec 11, 2023  |
| [Huge Icons](https://icon-sets.iconify.design/hugeicons)                                  | `@iconify-prerendered/vue-hugeicons`                  | May 14, 2024  |
| [Humbleicons](https://icon-sets.iconify.design/humbleicons)                               | `@iconify-prerendered/vue-humbleicons`                | Apr 4, 2024   |
| [Icalicons](https://icon-sets.iconify.design/il)                                          | `@iconify-prerendered/vue-il`                         | Dec 11, 2023  |
| [IcoMoon Free](https://icon-sets.iconify.design/icomoon-free)                             | `@iconify-prerendered/vue-icomoon-free`               | Dec 11, 2023  |
| [IconaMoon](https://icon-sets.iconify.design/iconamoon)                                   | `@iconify-prerendered/vue-iconamoon`                  | Dec 11, 2023  |
| [Iconoir](https://icon-sets.iconify.design/iconoir)                                       | `@iconify-prerendered/vue-iconoir`                    | Apr 29, 2024  |
| [IconPark](https://icon-sets.iconify.design/icon-park)                                    | `@iconify-prerendered/vue-icon-park`                  | Nov 26, 2023  |
| [IconPark Outline](https://icon-sets.iconify.design/icon-park-outline)                    | `@iconify-prerendered/vue-icon-park-outline`          | Dec 11, 2023  |
| [IconPark Solid](https://icon-sets.iconify.design/icon-park-solid)                        | `@iconify-prerendered/vue-icon-park-solid`            | Dec 11, 2023  |
| [IconPark TwoTone](https://icon-sets.iconify.design/icon-park-twotone)                    | `@iconify-prerendered/vue-icon-park-twotone`          | Dec 11, 2023  |
| [Icons8 Windows 10 Icons](https://icon-sets.iconify.design/icons8)                        | `@iconify-prerendered/vue-icons8`                     | Dec 11, 2023  |
| [Icons8 Windows 8 Icons](https://icon-sets.iconify.design/wpf)                            | `@iconify-prerendered/vue-wpf`                        | Dec 11, 2023  |
| [Innowatio Font](https://icon-sets.iconify.design/iwwa)                                   | `@iconify-prerendered/vue-iwwa`                       | Dec 11, 2023  |
| [IonIcons](https://icon-sets.iconify.design/ion)                                          | `@iconify-prerendered/vue-ion`                        | May 2, 2024   |
| [Jam Icons](https://icon-sets.iconify.design/jam)                                         | `@iconify-prerendered/vue-jam`                        | Dec 11, 2023  |
| [Lets Icons](https://icon-sets.iconify.design/lets-icons)                                 | `@iconify-prerendered/vue-lets-icons`                 | Dec 11, 2023  |
| [Ligature Symbols](https://icon-sets.iconify.design/ls)                                   | `@iconify-prerendered/vue-ls`                         | Dec 11, 2023  |
| [Line Awesome](https://icon-sets.iconify.design/la)                                       | `@iconify-prerendered/vue-la`                         | Dec 11, 2023  |
| [Lucide](https://icon-sets.iconify.design/lucide)                                         | `@iconify-prerendered/vue-lucide`                     | May 23, 2024  |
| [Mage Icons](https://icon-sets.iconify.design/mage)                                       | `@iconify-prerendered/vue-mage`                       | Feb 24, 2024  |
| [Majesticons](https://icon-sets.iconify.design/majesticons)                               | `@iconify-prerendered/vue-majesticons`                | Dec 11, 2023  |
| [Maki](https://icon-sets.iconify.design/maki)                                             | `@iconify-prerendered/vue-maki`                       | Mar 4, 2024   |
| [Map Icons](https://icon-sets.iconify.design/map)                                         | `@iconify-prerendered/vue-map`                        | Dec 11, 2023  |
| [Marketeq](https://icon-sets.iconify.design/marketeq)                                     | `@iconify-prerendered/vue-marketeq`                   | Apr 4, 2024   |
| [Material Design Iconic Font](https://icon-sets.iconify.design/zmdi)                      | `@iconify-prerendered/vue-zmdi`                       | Dec 11, 2023  |
| [Material Design Icons](https://icon-sets.iconify.design/mdi)                             | `@iconify-prerendered/vue-mdi`                        | Apr 7, 2024   |
| [Material Design Light](https://icon-sets.iconify.design/mdi-light)                       | `@iconify-prerendered/vue-mdi-light`                  | Dec 11, 2023  |
| [Material Line Icons](https://icon-sets.iconify.design/line-md)                           | `@iconify-prerendered/vue-line-md`                    | Mar 22, 2024  |
| [Material Symbols](https://icon-sets.iconify.design/material-symbols)                     | `@iconify-prerendered/vue-material-symbols`           | May 14, 2024  |
| [Material Symbols Light](https://icon-sets.iconify.design/material-symbols-light)         | `@iconify-prerendered/vue-material-symbols-light`     | May 14, 2024  |
| [Medical Icons](https://icon-sets.iconify.design/medical-icon)                            | `@iconify-prerendered/vue-medical-icon`               | Dec 11, 2023  |
| [Memory Icons](https://icon-sets.iconify.design/memory)                                   | `@iconify-prerendered/vue-memory`                     | Jan 2, 2024   |
| [Meteocons](https://icon-sets.iconify.design/meteocons)                                   | `@iconify-prerendered/vue-meteocons`                  | Dec 11, 2023  |
| [MingCute Icon](https://icon-sets.iconify.design/mingcute)                                | `@iconify-prerendered/vue-mingcute`                   | Mar 22, 2024  |
| [Mono Icons](https://icon-sets.iconify.design/mi)                                         | `@iconify-prerendered/vue-mi`                         | Dec 11, 2023  |
| [Mono Icons](https://icon-sets.iconify.design/mono-icons)                                 | `@iconify-prerendered/vue-mono-icons`                 | Dec 11, 2023  |
| [Myna UI Icons](https://icon-sets.iconify.design/mynaui)                                  | `@iconify-prerendered/vue-mynaui`                     | Mar 22, 2024  |
| [Nimbus](https://icon-sets.iconify.design/nimbus)                                         | `@iconify-prerendered/vue-nimbus`                     | Dec 11, 2023  |
| [Nonicons](https://icon-sets.iconify.design/nonicons)                                     | `@iconify-prerendered/vue-nonicons`                   | Dec 11, 2023  |
| [Noto Emoji](https://icon-sets.iconify.design/noto)                                       | `@iconify-prerendered/vue-noto`                       | Dec 11, 2023  |
| [Noto Emoji (v1)](https://icon-sets.iconify.design/noto-v1)                               | `@iconify-prerendered/vue-noto-v1`                    | Dec 11, 2023  |
| [Octicons](https://icon-sets.iconify.design/octicon)                                      | `@iconify-prerendered/vue-octicon`                    | Apr 22, 2024  |
| [OOUI](https://icon-sets.iconify.design/ooui)                                             | `@iconify-prerendered/vue-ooui`                       | Mar 25, 2024  |
| [Open Iconic](https://icon-sets.iconify.design/oi)                                        | `@iconify-prerendered/vue-oi`                         | Dec 11, 2023  |
| [OpenMoji](https://icon-sets.iconify.design/openmoji)                                     | `@iconify-prerendered/vue-openmoji`                   | Apr 15, 2024  |
| [OpenSearch UI](https://icon-sets.iconify.design/oui)                                     | `@iconify-prerendered/vue-oui`                        | May 2, 2024   |
| [Pepicons](https://icon-sets.iconify.design/pepicons)                                     | `@iconify-prerendered/vue-pepicons`                   | Jan 2, 2023   |
| [Pepicons Pencil](https://icon-sets.iconify.design/pepicons-pencil)                       | `@iconify-prerendered/vue-pepicons-pencil`            | Dec 11, 2023  |
| [Pepicons Pop!](https://icon-sets.iconify.design/pepicons-pop)                            | `@iconify-prerendered/vue-pepicons-pop`               | Dec 11, 2023  |
| [Pepicons Print](https://icon-sets.iconify.design/pepicons-print)                         | `@iconify-prerendered/vue-pepicons-print`             | Dec 11, 2023  |
| [Phosphor](https://icon-sets.iconify.design/ph)                                           | `@iconify-prerendered/vue-ph`                         | May 6, 2024   |
| [Pixelarticons](https://icon-sets.iconify.design/pixelarticons)                           | `@iconify-prerendered/vue-pixelarticons`              | Apr 18, 2024  |
| [PrestaShop Icons](https://icon-sets.iconify.design/ps)                                   | `@iconify-prerendered/vue-ps`                         | Dec 11, 2023  |
| [Prime Icons](https://icon-sets.iconify.design/prime)                                     | `@iconify-prerendered/vue-prime`                      | May 9, 2024   |
| [Quill Icons](https://icon-sets.iconify.design/quill)                                     | `@iconify-prerendered/vue-quill`                      | Dec 11, 2023  |
| [Radix Icons](https://icon-sets.iconify.design/radix-icons)                               | `@iconify-prerendered/vue-radix-icons`                | Dec 11, 2023  |
| [Raphael](https://icon-sets.iconify.design/raphael)                                       | `@iconify-prerendered/vue-raphael`                    | Dec 11, 2023  |
| [Remix Icon](https://icon-sets.iconify.design/ri)                                         | `@iconify-prerendered/vue-ri`                         | Feb 26, 2024  |
| [Simple Icons](https://icon-sets.iconify.design/simple-icons)                             | `@iconify-prerendered/vue-simple-icons`               | May 20, 2024  |
| [Simple line icons](https://icon-sets.iconify.design/simple-line-icons)                   | `@iconify-prerendered/vue-simple-line-icons`          | Dec 11, 2023  |
| [Skill Icons](https://icon-sets.iconify.design/skill-icons)                               | `@iconify-prerendered/vue-skill-icons`                | Feb 21, 2024  |
| [SmartIcons Glyph](https://icon-sets.iconify.design/si-glyph)                             | `@iconify-prerendered/vue-si-glyph`                   | Dec 11, 2023  |
| [Solar](https://icon-sets.iconify.design/solar)                                           | `@iconify-prerendered/vue-solar`                      | Dec 11, 2023  |
| [Streamline](https://icon-sets.iconify.design/streamline)                                 | `@iconify-prerendered/vue-streamline`                 | Dec 11, 2023  |
| [Streamline Emojis](https://icon-sets.iconify.design/streamline-emojis)                   | `@iconify-prerendered/vue-streamline-emojis`          | Dec 11, 2023  |
| [Subway Icon Set](https://icon-sets.iconify.design/subway)                                | `@iconify-prerendered/vue-subway`                     | Dec 11, 2023  |
| [SVG Logos](https://icon-sets.iconify.design/logos)                                       | `@iconify-prerendered/vue-logos`                      | Dec 27, 2023  |
| [SVG Spinners](https://icon-sets.iconify.design/svg-spinners)                             | `@iconify-prerendered/vue-svg-spinners`               | Jan 15, 2023  |
| [System UIcons](https://icon-sets.iconify.design/system-uicons)                           | `@iconify-prerendered/vue-system-uicons`              | Dec 11, 2023  |
| [Tabler Icons](https://icon-sets.iconify.design/tabler)                                   | `@iconify-prerendered/vue-tabler`                     | May 23, 2024  |
| [TDesign Icons](https://icon-sets.iconify.design/tdesign)                                 | `@iconify-prerendered/vue-tdesign`                    | Dec 11, 2023  |
| [Teenyicons](https://icon-sets.iconify.design/teenyicons)                                 | `@iconify-prerendered/vue-teenyicons`                 | Dec 11, 2023  |
| [Token Icons](https://icon-sets.iconify.design/token)                                     | `@iconify-prerendered/vue-token`                      | May 17, 2024  |
| [Token Icons Branded](https://icon-sets.iconify.design/token-branded)                     | `@iconify-prerendered/vue-token-branded`              | May 17, 2024  |
| [TopCoat Icons](https://icon-sets.iconify.design/topcoat)                                 | `@iconify-prerendered/vue-topcoat`                    | Dec 11, 2023  |
| [Twitter Emoji](https://icon-sets.iconify.design/twemoji)                                 | `@iconify-prerendered/vue-twemoji`                    | Dec 11, 2023  |
| [Typicons](https://icon-sets.iconify.design/typcn)                                        | `@iconify-prerendered/vue-typcn`                      | Dec 11, 2023  |
| [uiw icons](https://icon-sets.iconify.design/uiw)                                         | `@iconify-prerendered/vue-uiw`                        | Dec 11, 2023  |
| [Unicons](https://icon-sets.iconify.design/uil)                                           | `@iconify-prerendered/vue-uil`                        | Dec 11, 2023  |
| [Unicons Monochrome](https://icon-sets.iconify.design/uim)                                | `@iconify-prerendered/vue-uim`                        | Dec 11, 2023  |
| [Unicons Solid](https://icon-sets.iconify.design/uis)                                     | `@iconify-prerendered/vue-uis`                        | Dec 11, 2023  |
| [Unicons Thin Line](https://icon-sets.iconify.design/uit)                                 | `@iconify-prerendered/vue-uit`                        | Dec 11, 2023  |
| [UnJS Logos](https://icon-sets.iconify.design/unjs)                                       | `@iconify-prerendered/vue-unjs`                       | Mar 20, 2024  |
| [Vaadin Icons](https://icon-sets.iconify.design/vaadin)                                   | `@iconify-prerendered/vue-vaadin`                     | Dec 11, 2023  |
| [Vesper Icons](https://icon-sets.iconify.design/vs)                                       | `@iconify-prerendered/vue-vs`                         | Dec 11, 2023  |
| [VSCode Icons](https://icon-sets.iconify.design/vscode-icons)                             | `@iconify-prerendered/vue-vscode-icons`               | May 6, 2024   |
| [Weather Icons](https://icon-sets.iconify.design/wi)                                      | `@iconify-prerendered/vue-wi`                         | Dec 11, 2023  |
| [Web Symbols Liga](https://icon-sets.iconify.design/websymbol)                            | `@iconify-prerendered/vue-websymbol`                  | Dec 11, 2023  |
| [WebHostingHub Glyphs](https://icon-sets.iconify.design/whh)                              | `@iconify-prerendered/vue-whh`                        | Dec 11, 2023  |
| [Zondicons](https://icon-sets.iconify.design/zondicons)                                   | `@iconify-prerendered/vue-zondicons`                  | Dec 11, 2023  |

<!-- PACKAGE LIST END -->

## License

The code for generating the icon sets is distributed under the MIT license. The
icon sets themselves are distributed under the license of their author.

## Development setup

1. Install [Deno](https://deno.land/).
2. Run `deno task generate` for generate all collections. Params:
   - `--version` or `-v` specify version base for generated packages. Optional.
   - `--prefix` or `-p` specify with collection to generate. May be multiple
     times. Optional.
   - `--no-replace-ids` disable replacing ids. Required for test case. Optional.
   - `--output` or `-o` directory to place generated files. Optional.
3. Run `deno task test` for run all tests.
   [See more about test running](https://deno.land/manual@v1.30.1/basics/testing).

## Benchmarking

You can benchmark two version of icon sets. To do that:

1. Generate _baseline_ icon set by command:
   `deno task generate -p=fluent-emoji -o=benckmarks/generated/baseline`
2. Make any changes to generation process or whatever
3. Generate _tested_ icon set by command:
   `deno task generate -p=fluent-emoji -o=benckmarks/generated/test`
4. Run benchmark by `deno bench --allow-env`
5. Go to step #2
