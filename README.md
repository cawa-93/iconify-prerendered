> [!Important] This project is maintained by developer from Ukraine 🇺🇦
>
> I do my best, but due to Russia's ongoing full-scale invasion of Ukraine, I
> barely have the energy to support open source projects.
>
> If my work has been useful to you, please consider
> [supporting Ukraine](https://stand-with-ukraine.pp.ua/) or
> [me personally](https://send.monobank.ua/6SmojkkR9i). Even your **$1** has an
> impact!

---

# @iconify-prerendered

A superset standalone icon-components for Vue with zero dependencies. Designed
for ease of use and high performance.

## Features

- **Easy to use**
  - No plugins required! Compatible with any build tools.
  - Designed for the best compatibility with IDE auto-completion
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

Import icon-component from a set like usual.

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

Only these three icons will be included in your bundle. Your bundler may
tree-shake all other icons.

That's all you need. No plugins, extra configs, IDE extensions or something
else.

## Customizing icon default attributes

By default, all icons have only two attributes: `role="img"` and
`aria-hidden="true"`. While you are free to redefine these attributes or add new
ones for each icon, you might want to apply certain attributes, such as `class`
or `style`, to all icons within a set.

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
| [Academicons](https://icon-sets.iconify.design/academicons)                               | `@iconify-prerendered/vue-academicons`                | Sep 28, 2024  |
| [Akar Icons](https://icon-sets.iconify.design/akar-icons)                                 | `@iconify-prerendered/vue-akar-icons`                 | Aug 4, 2024   |
| [Ant Design Icons](https://icon-sets.iconify.design/ant-design)                           | `@iconify-prerendered/vue-ant-design`                 | Dec 16, 2024  |
| [Arcticons](https://icon-sets.iconify.design/arcticons)                                   | `@iconify-prerendered/vue-arcticons`                  | Jan 14, 2025  |
| [Basil](https://icon-sets.iconify.design/basil)                                           | `@iconify-prerendered/vue-basil`                      | Aug 4, 2024   |
| [Bitcoin Icons](https://icon-sets.iconify.design/bitcoin-icons)                           | `@iconify-prerendered/vue-bitcoin-icons`              | Aug 4, 2024   |
| [Bootstrap Icons](https://icon-sets.iconify.design/bi)                                    | `@iconify-prerendered/vue-bi`                         | Jan 5, 2024   |
| [BoxIcons](https://icon-sets.iconify.design/bx)                                           | `@iconify-prerendered/vue-bx`                         | Aug 4, 2024   |
| [BoxIcons Logo](https://icon-sets.iconify.design/bxl)                                     | `@iconify-prerendered/vue-bxl`                        | Aug 4, 2024   |
| [BoxIcons Solid](https://icon-sets.iconify.design/bxs)                                    | `@iconify-prerendered/vue-bxs`                        | Aug 4, 2024   |
| [BPMN](https://icon-sets.iconify.design/bpmn)                                             | `@iconify-prerendered/vue-bpmn`                       | Aug 4, 2024   |
| [Brandico](https://icon-sets.iconify.design/brandico)                                     | `@iconify-prerendered/vue-brandico`                   | Aug 4, 2024   |
| [Bytesize Icons](https://icon-sets.iconify.design/bytesize)                               | `@iconify-prerendered/vue-bytesize`                   | Aug 4, 2024   |
| [Carbon](https://icon-sets.iconify.design/carbon)                                         | `@iconify-prerendered/vue-carbon`                     | Oct 26, 2024  |
| [Catppuccin Icons](https://icon-sets.iconify.design/catppuccin)                           | `@iconify-prerendered/vue-catppuccin`                 | Dec 3, 2024   |
| [Charm Icons](https://icon-sets.iconify.design/charm)                                     | `@iconify-prerendered/vue-charm`                      | Aug 4, 2024   |
| [Circle Flags](https://icon-sets.iconify.design/circle-flags)                             | `@iconify-prerendered/vue-circle-flags`               | Dec 12, 2024  |
| [Circum Icons](https://icon-sets.iconify.design/circum)                                   | `@iconify-prerendered/vue-circum`                     | Apr 22, 2024  |
| [Clarity](https://icon-sets.iconify.design/clarity)                                       | `@iconify-prerendered/vue-clarity`                    | Jun 3, 2024   |
| [CodeX Icons](https://icon-sets.iconify.design/codex)                                     | `@iconify-prerendered/vue-codex`                      | Dec 27, 2024  |
| [Codicons](https://icon-sets.iconify.design/codicon)                                      | `@iconify-prerendered/vue-codicon`                    | Dec 12, 2024  |
| [coolicons](https://icon-sets.iconify.design/ci)                                          | `@iconify-prerendered/vue-ci`                         | Aug 4, 2024   |
| [CoreUI Brands](https://icon-sets.iconify.design/cib)                                     | `@iconify-prerendered/vue-cib`                        | Jul 25, 2024  |
| [CoreUI Flags](https://icon-sets.iconify.design/cif)                                      | `@iconify-prerendered/vue-cif`                        | Jul 25, 2024  |
| [CoreUI Free](https://icon-sets.iconify.design/cil)                                       | `@iconify-prerendered/vue-cil`                        | Jul 25, 2024  |
| [Covid Icons](https://icon-sets.iconify.design/covid)                                     | `@iconify-prerendered/vue-covid`                      | Aug 4, 2024   |
| [Cryptocurrency Color Icons](https://icon-sets.iconify.design/cryptocurrency-color)       | `@iconify-prerendered/vue-cryptocurrency-color`       | Aug 4, 2024   |
| [Cryptocurrency Icons](https://icon-sets.iconify.design/cryptocurrency)                   | `@iconify-prerendered/vue-cryptocurrency`             | Aug 4, 2024   |
| [css.gg](https://icon-sets.iconify.design/gg)                                             | `@iconify-prerendered/vue-gg`                         | Aug 4, 2024   |
| [Cuida Icons](https://icon-sets.iconify.design/cuida)                                     | `@iconify-prerendered/vue-cuida`                      | Oct 3, 2024   |
| [Custom Brand Icons](https://icon-sets.iconify.design/cbi)                                | `@iconify-prerendered/vue-cbi`                        | Nov 19, 2024  |
| [Dashicons](https://icon-sets.iconify.design/dashicons)                                   | `@iconify-prerendered/vue-dashicons`                  | May 27, 2024  |
| [Devicon](https://icon-sets.iconify.design/devicon)                                       | `@iconify-prerendered/vue-devicon`                    | Dec 26, 2024  |
| [Devicon Plain](https://icon-sets.iconify.design/devicon-plain)                           | `@iconify-prerendered/vue-devicon-plain`              | Dec 26, 2024  |
| [Duoicons](https://icon-sets.iconify.design/duo-icons)                                    | `@iconify-prerendered/vue-duo-icons`                  | Sep 28, 2024  |
| [Elegant](https://icon-sets.iconify.design/et)                                            | `@iconify-prerendered/vue-et`                         | Aug 4, 2024   |
| [Element Plus](https://icon-sets.iconify.design/ep)                                       | `@iconify-prerendered/vue-ep`                         | Mar 11, 2024  |
| [Elusive Icons](https://icon-sets.iconify.design/el)                                      | `@iconify-prerendered/vue-el`                         | Aug 4, 2024   |
| [Emoji One (Colored)](https://icon-sets.iconify.design/emojione)                          | `@iconify-prerendered/vue-emojione`                   | Aug 4, 2024   |
| [Emoji One (Monotone)](https://icon-sets.iconify.design/emojione-monotone)                | `@iconify-prerendered/vue-emojione-monotone`          | Aug 4, 2024   |
| [Emoji One (v1)](https://icon-sets.iconify.design/emojione-v1)                            | `@iconify-prerendered/vue-emojione-v1`                | Aug 4, 2024   |
| [Entypo+](https://icon-sets.iconify.design/entypo)                                        | `@iconify-prerendered/vue-entypo`                     | Aug 4, 2024   |
| [Entypo+ Social](https://icon-sets.iconify.design/entypo-social)                          | `@iconify-prerendered/vue-entypo-social`              | Aug 4, 2024   |
| [EOS Icons](https://icon-sets.iconify.design/eos-icons)                                   | `@iconify-prerendered/vue-eos-icons`                  | Aug 4, 2024   |
| [Eva Icons](https://icon-sets.iconify.design/eva)                                         | `@iconify-prerendered/vue-eva`                        | Aug 4, 2024   |
| [Evil Icons](https://icon-sets.iconify.design/ei)                                         | `@iconify-prerendered/vue-ei`                         | Aug 4, 2024   |
| [Famicons](https://icon-sets.iconify.design/famicons)                                     | `@iconify-prerendered/vue-famicons`                   | Dec 27, 2024  |
| [Feather Icon](https://icon-sets.iconify.design/fe)                                       | `@iconify-prerendered/vue-fe`                         | Aug 4, 2024   |
| [Feather Icons](https://icon-sets.iconify.design/feather)                                 | `@iconify-prerendered/vue-feather`                    | Aug 4, 2024   |
| [File Icons](https://icon-sets.iconify.design/file-icons)                                 | `@iconify-prerendered/vue-file-icons`                 | Jul 17, 2024  |
| [Firefox OS Emoji](https://icon-sets.iconify.design/fxemoji)                              | `@iconify-prerendered/vue-fxemoji`                    | Aug 4, 2024   |
| [Flag Icons](https://icon-sets.iconify.design/flag)                                       | `@iconify-prerendered/vue-flag`                       | Oct 7, 2024   |
| [Flagpack](https://icon-sets.iconify.design/flagpack)                                     | `@iconify-prerendered/vue-flagpack`                   | Aug 4, 2024   |
| [Flat Color Icons](https://icon-sets.iconify.design/flat-color-icons)                     | `@iconify-prerendered/vue-flat-color-icons`           | Aug 4, 2024   |
| [Flat UI Icons](https://icon-sets.iconify.design/flat-ui)                                 | `@iconify-prerendered/vue-flat-ui`                    | Aug 4, 2024   |
| [Flowbite Icons](https://icon-sets.iconify.design/flowbite)                               | `@iconify-prerendered/vue-flowbite`                   | Jan 14, 2025  |
| [Fluent Emoji](https://icon-sets.iconify.design/fluent-emoji)                             | `@iconify-prerendered/vue-fluent-emoji`               | Oct 3, 2024   |
| [Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat)                   | `@iconify-prerendered/vue-fluent-emoji-flat`          | Oct 3, 2024   |
| [Fluent Emoji High Contrast](https://icon-sets.iconify.design/fluent-emoji-high-contrast) | `@iconify-prerendered/vue-fluent-emoji-high-contrast` | Oct 3, 2024   |
| [Fluent UI MDL2](https://icon-sets.iconify.design/fluent-mdl2)                            | `@iconify-prerendered/vue-fluent-mdl2`                | Apr 7, 2024   |
| [Fluent UI System Color Icons](https://icon-sets.iconify.design/fluent-color)             | `@iconify-prerendered/vue-fluent-color`               | Dec 16, 2024  |
| [Fluent UI System Icons](https://icon-sets.iconify.design/fluent)                         | `@iconify-prerendered/vue-fluent`                     | Dec 16, 2024  |
| [Font Awesome 4](https://icon-sets.iconify.design/fa)                                     | `@iconify-prerendered/vue-fa`                         | Dec 11, 2023  |
| [Font Awesome 5 Brands](https://icon-sets.iconify.design/fa-brands)                       | `@iconify-prerendered/vue-fa-brands`                  | Aug 4, 2024   |
| [Font Awesome 5 Regular](https://icon-sets.iconify.design/fa-regular)                     | `@iconify-prerendered/vue-fa-regular`                 | Aug 4, 2024   |
| [Font Awesome 5 Solid](https://icon-sets.iconify.design/fa-solid)                         | `@iconify-prerendered/vue-fa-solid`                   | Aug 4, 2024   |
| [Font Awesome Brands](https://icon-sets.iconify.design/fa6-brands)                        | `@iconify-prerendered/vue-fa6-brands`                 | Dec 17, 2024  |
| [Font Awesome Regular](https://icon-sets.iconify.design/fa6-regular)                      | `@iconify-prerendered/vue-fa6-regular`                | Nov 19, 2024  |
| [Font Awesome Solid](https://icon-sets.iconify.design/fa6-solid)                          | `@iconify-prerendered/vue-fa6-solid`                  | Nov 19, 2024  |
| [Font-GIS](https://icon-sets.iconify.design/gis)                                          | `@iconify-prerendered/vue-gis`                        | Jan 14, 2025  |
| [FontAudio](https://icon-sets.iconify.design/fad)                                         | `@iconify-prerendered/vue-fad`                        | Aug 4, 2024   |
| [Fontelico](https://icon-sets.iconify.design/fontelico)                                   | `@iconify-prerendered/vue-fontelico`                  | Aug 4, 2024   |
| [Fontisto](https://icon-sets.iconify.design/fontisto)                                     | `@iconify-prerendered/vue-fontisto`                   | Aug 4, 2024   |
| [FormKit Icons](https://icon-sets.iconify.design/formkit)                                 | `@iconify-prerendered/vue-formkit`                    | Apr 9, 2024   |
| [Foundation](https://icon-sets.iconify.design/foundation)                                 | `@iconify-prerendered/vue-foundation`                 | Aug 4, 2024   |
| [Framework7 Icons](https://icon-sets.iconify.design/f7)                                   | `@iconify-prerendered/vue-f7`                         | Aug 4, 2024   |
| [Gala Icons](https://icon-sets.iconify.design/gala)                                       | `@iconify-prerendered/vue-gala`                       | Nov 26, 2023  |
| [Game Icons](https://icon-sets.iconify.design/game-icons)                                 | `@iconify-prerendered/vue-game-icons`                 | Apr 7, 2024   |
| [Garden SVG Icons](https://icon-sets.iconify.design/garden)                               | `@iconify-prerendered/vue-garden`                     | Dec 27, 2024  |
| [GeoGlyphs](https://icon-sets.iconify.design/geo)                                         | `@iconify-prerendered/vue-geo`                        | Aug 4, 2024   |
| [Gitlab SVGs](https://icon-sets.iconify.design/pajamas)                                   | `@iconify-prerendered/vue-pajamas`                    | Nov 14, 2024  |
| [Google Material Icons](https://icon-sets.iconify.design/ic)                              | `@iconify-prerendered/vue-ic`                         | Aug 4, 2024   |
| [Gravity UI Icons](https://icon-sets.iconify.design/gravity-ui)                           | `@iconify-prerendered/vue-gravity-ui`                 | Dec 16, 2024  |
| [Gridicons](https://icon-sets.iconify.design/gridicons)                                   | `@iconify-prerendered/vue-gridicons`                  | Aug 4, 2024   |
| [Grommet Icons](https://icon-sets.iconify.design/grommet-icons)                           | `@iconify-prerendered/vue-grommet-icons`              | May 27, 2024  |
| [Guidance](https://icon-sets.iconify.design/guidance)                                     | `@iconify-prerendered/vue-guidance`                   | Aug 4, 2024   |
| [Health Icons](https://icon-sets.iconify.design/healthicons)                              | `@iconify-prerendered/vue-healthicons`                | Dec 28, 2024  |
| [HeroIcons](https://icon-sets.iconify.design/heroicons)                                   | `@iconify-prerendered/vue-heroicons`                  | Jul 25, 2024  |
| [HeroIcons v1 Outline](https://icon-sets.iconify.design/heroicons-outline)                | `@iconify-prerendered/vue-heroicons-outline`          | Aug 4, 2024   |
| [HeroIcons v1 Solid](https://icon-sets.iconify.design/heroicons-solid)                    | `@iconify-prerendered/vue-heroicons-solid`            | Aug 4, 2024   |
| [Huge Icons](https://icon-sets.iconify.design/hugeicons)                                  | `@iconify-prerendered/vue-hugeicons`                  | Dec 21, 2024  |
| [Humbleicons](https://icon-sets.iconify.design/humbleicons)                               | `@iconify-prerendered/vue-humbleicons`                | Dec 23, 2024  |
| [Icalicons](https://icon-sets.iconify.design/il)                                          | `@iconify-prerendered/vue-il`                         | Dec 11, 2023  |
| [IcoMoon Free](https://icon-sets.iconify.design/icomoon-free)                             | `@iconify-prerendered/vue-icomoon-free`               | Aug 4, 2024   |
| [IconaMoon](https://icon-sets.iconify.design/iconamoon)                                   | `@iconify-prerendered/vue-iconamoon`                  | Aug 4, 2024   |
| [Iconoir](https://icon-sets.iconify.design/iconoir)                                       | `@iconify-prerendered/vue-iconoir`                    | Dec 28, 2024  |
| [IconPark](https://icon-sets.iconify.design/icon-park)                                    | `@iconify-prerendered/vue-icon-park`                  | Nov 26, 2023  |
| [IconPark Outline](https://icon-sets.iconify.design/icon-park-outline)                    | `@iconify-prerendered/vue-icon-park-outline`          | Aug 4, 2024   |
| [IconPark Solid](https://icon-sets.iconify.design/icon-park-solid)                        | `@iconify-prerendered/vue-icon-park-solid`            | Aug 4, 2024   |
| [IconPark TwoTone](https://icon-sets.iconify.design/icon-park-twotone)                    | `@iconify-prerendered/vue-icon-park-twotone`          | Aug 4, 2024   |
| [Icons8 Windows 10 Icons](https://icon-sets.iconify.design/icons8)                        | `@iconify-prerendered/vue-icons8`                     | Aug 4, 2024   |
| [Icons8 Windows 8 Icons](https://icon-sets.iconify.design/wpf)                            | `@iconify-prerendered/vue-wpf`                        | Aug 4, 2024   |
| [Innowatio Font](https://icon-sets.iconify.design/iwwa)                                   | `@iconify-prerendered/vue-iwwa`                       | Aug 4, 2024   |
| [IonIcons](https://icon-sets.iconify.design/ion)                                          | `@iconify-prerendered/vue-ion`                        | May 2, 2024   |
| [Jam Icons](https://icon-sets.iconify.design/jam)                                         | `@iconify-prerendered/vue-jam`                        | Aug 4, 2024   |
| [Lets Icons](https://icon-sets.iconify.design/lets-icons)                                 | `@iconify-prerendered/vue-lets-icons`                 | Aug 4, 2024   |
| [Ligature Symbols](https://icon-sets.iconify.design/ls)                                   | `@iconify-prerendered/vue-ls`                         | Aug 4, 2024   |
| [Line Awesome](https://icon-sets.iconify.design/la)                                       | `@iconify-prerendered/vue-la`                         | Aug 4, 2024   |
| [Lineicons](https://icon-sets.iconify.design/lineicons)                                   | `@iconify-prerendered/vue-lineicons`                  | Oct 26, 2024  |
| [Lsicon](https://icon-sets.iconify.design/lsicon)                                         | `@iconify-prerendered/vue-lsicon`                     | Oct 3, 2024   |
| [Lucide](https://icon-sets.iconify.design/lucide)                                         | `@iconify-prerendered/vue-lucide`                     | Jan 14, 2025  |
| [Lucide Lab](https://icon-sets.iconify.design/lucide-lab)                                 | `@iconify-prerendered/vue-lucide-lab`                 | Nov 9, 2024   |
| [Mage Icons](https://icon-sets.iconify.design/mage)                                       | `@iconify-prerendered/vue-mage`                       | Aug 4, 2024   |
| [Majesticons](https://icon-sets.iconify.design/majesticons)                               | `@iconify-prerendered/vue-majesticons`                | Aug 4, 2024   |
| [Maki](https://icon-sets.iconify.design/maki)                                             | `@iconify-prerendered/vue-maki`                       | Dec 16, 2024  |
| [Map Icons](https://icon-sets.iconify.design/map)                                         | `@iconify-prerendered/vue-map`                        | Aug 4, 2024   |
| [Marketeq](https://icon-sets.iconify.design/marketeq)                                     | `@iconify-prerendered/vue-marketeq`                   | Apr 4, 2024   |
| [Material Design Iconic Font](https://icon-sets.iconify.design/zmdi)                      | `@iconify-prerendered/vue-zmdi`                       | Dec 11, 2023  |
| [Material Design Icons](https://icon-sets.iconify.design/mdi)                             | `@iconify-prerendered/vue-mdi`                        | Jun 20, 2024  |
| [Material Design Light](https://icon-sets.iconify.design/mdi-light)                       | `@iconify-prerendered/vue-mdi-light`                  | Aug 4, 2024   |
| [Material Line Icons](https://icon-sets.iconify.design/line-md)                           | `@iconify-prerendered/vue-line-md`                    | Jan 10, 2025  |
| [Material Symbols](https://icon-sets.iconify.design/material-symbols)                     | `@iconify-prerendered/vue-material-symbols`           | Dec 6, 2024   |
| [Material Symbols Light](https://icon-sets.iconify.design/material-symbols-light)         | `@iconify-prerendered/vue-material-symbols-light`     | Dec 6, 2024   |
| [Medical Icons](https://icon-sets.iconify.design/medical-icon)                            | `@iconify-prerendered/vue-medical-icon`               | Aug 4, 2024   |
| [Memory Icons](https://icon-sets.iconify.design/memory)                                   | `@iconify-prerendered/vue-memory`                     | Jan 2, 2024   |
| [Meteocons](https://icon-sets.iconify.design/meteocons)                                   | `@iconify-prerendered/vue-meteocons`                  | Jul 1, 2024   |
| [Meteor Icons](https://icon-sets.iconify.design/meteor-icons)                             | `@iconify-prerendered/vue-meteor-icons`               | Nov 9, 2024   |
| [MingCute Icon](https://icon-sets.iconify.design/mingcute)                                | `@iconify-prerendered/vue-mingcute`                   | Dec 23, 2024  |
| [Mono Icons](https://icon-sets.iconify.design/mi)                                         | `@iconify-prerendered/vue-mi`                         | Aug 4, 2024   |
| [Mono Icons](https://icon-sets.iconify.design/mono-icons)                                 | `@iconify-prerendered/vue-mono-icons`                 | Aug 4, 2024   |
| [Myna UI Icons](https://icon-sets.iconify.design/mynaui)                                  | `@iconify-prerendered/vue-mynaui`                     | Nov 25, 2024  |
| [Nimbus](https://icon-sets.iconify.design/nimbus)                                         | `@iconify-prerendered/vue-nimbus`                     | Aug 4, 2024   |
| [Nonicons](https://icon-sets.iconify.design/nonicons)                                     | `@iconify-prerendered/vue-nonicons`                   | Dec 16, 2024  |
| [Noto Emoji](https://icon-sets.iconify.design/noto)                                       | `@iconify-prerendered/vue-noto`                       | Oct 7, 2024   |
| [Noto Emoji (v1)](https://icon-sets.iconify.design/noto-v1)                               | `@iconify-prerendered/vue-noto-v1`                    | Aug 4, 2024   |
| [NRK Core Icons](https://icon-sets.iconify.design/nrk)                                    | `@iconify-prerendered/vue-nrk`                        | Nov 14, 2024  |
| [Octicons](https://icon-sets.iconify.design/octicon)                                      | `@iconify-prerendered/vue-octicon`                    | Dec 6, 2024   |
| [OOUI](https://icon-sets.iconify.design/ooui)                                             | `@iconify-prerendered/vue-ooui`                       | Jan 10, 2025  |
| [Open Iconic](https://icon-sets.iconify.design/oi)                                        | `@iconify-prerendered/vue-oi`                         | Aug 4, 2024   |
| [OpenMoji](https://icon-sets.iconify.design/openmoji)                                     | `@iconify-prerendered/vue-openmoji`                   | Oct 23, 2024  |
| [OpenSearch UI](https://icon-sets.iconify.design/oui)                                     | `@iconify-prerendered/vue-oui`                        | Nov 2, 2024   |
| [Pepicons](https://icon-sets.iconify.design/pepicons)                                     | `@iconify-prerendered/vue-pepicons`                   | Jan 2, 2023   |
| [Pepicons Pencil](https://icon-sets.iconify.design/pepicons-pencil)                       | `@iconify-prerendered/vue-pepicons-pencil`            | Aug 4, 2024   |
| [Pepicons Pop!](https://icon-sets.iconify.design/pepicons-pop)                            | `@iconify-prerendered/vue-pepicons-pop`               | Aug 4, 2024   |
| [Pepicons Print](https://icon-sets.iconify.design/pepicons-print)                         | `@iconify-prerendered/vue-pepicons-print`             | Aug 4, 2024   |
| [Phosphor](https://icon-sets.iconify.design/ph)                                           | `@iconify-prerendered/vue-ph`                         | May 6, 2024   |
| [Pixelarticons](https://icon-sets.iconify.design/pixelarticons)                           | `@iconify-prerendered/vue-pixelarticons`              | Apr 18, 2024  |
| [PrestaShop Icons](https://icon-sets.iconify.design/ps)                                   | `@iconify-prerendered/vue-ps`                         | Aug 4, 2024   |
| [Prime Icons](https://icon-sets.iconify.design/prime)                                     | `@iconify-prerendered/vue-prime`                      | May 9, 2024   |
| [ProIcons](https://icon-sets.iconify.design/proicons)                                     | `@iconify-prerendered/vue-proicons`                   | Jan 8, 2025   |
| [Qlementine Icons](https://icon-sets.iconify.design/qlementine-icons)                     | `@iconify-prerendered/vue-qlementine-icons`           | Nov 25, 2024  |
| [Quill Icons](https://icon-sets.iconify.design/quill)                                     | `@iconify-prerendered/vue-quill`                      | Aug 4, 2024   |
| [Radix Icons](https://icon-sets.iconify.design/radix-icons)                               | `@iconify-prerendered/vue-radix-icons`                | Aug 4, 2024   |
| [Raphael](https://icon-sets.iconify.design/raphael)                                       | `@iconify-prerendered/vue-raphael`                    | Aug 4, 2024   |
| [Remix Icon](https://icon-sets.iconify.design/ri)                                         | `@iconify-prerendered/vue-ri`                         | Dec 17, 2024  |
| [Rivet Icons](https://icon-sets.iconify.design/rivet-icons)                               | `@iconify-prerendered/vue-rivet-icons`                | Jun 20, 2024  |
| [Sargam Icons](https://icon-sets.iconify.design/si)                                       | `@iconify-prerendered/vue-si`                         | Oct 8, 2024   |
| [Siemens Industrial Experience Icons](https://icon-sets.iconify.design/ix)                | `@iconify-prerendered/vue-ix`                         | Nov 9, 2024   |
| [Simple Icons](https://icon-sets.iconify.design/simple-icons)                             | `@iconify-prerendered/vue-simple-icons`               | Jan 14, 2025  |
| [Simple line icons](https://icon-sets.iconify.design/simple-line-icons)                   | `@iconify-prerendered/vue-simple-line-icons`          | Aug 4, 2024   |
| [Skill Icons](https://icon-sets.iconify.design/skill-icons)                               | `@iconify-prerendered/vue-skill-icons`                | Jul 17, 2024  |
| [SmartIcons Glyph](https://icon-sets.iconify.design/si-glyph)                             | `@iconify-prerendered/vue-si-glyph`                   | Aug 4, 2024   |
| [Solar](https://icon-sets.iconify.design/solar)                                           | `@iconify-prerendered/vue-solar`                      | Aug 4, 2024   |
| [Stash Icons](https://icon-sets.iconify.design/stash)                                     | `@iconify-prerendered/vue-stash`                      | Oct 8, 2024   |
| [Streamline](https://icon-sets.iconify.design/streamline)                                 | `@iconify-prerendered/vue-streamline`                 | Aug 4, 2024   |
| [Streamline Emojis](https://icon-sets.iconify.design/streamline-emojis)                   | `@iconify-prerendered/vue-streamline-emojis`          | Aug 4, 2024   |
| [Subway Icon Set](https://icon-sets.iconify.design/subway)                                | `@iconify-prerendered/vue-subway`                     | Jun 3, 2024   |
| [SVG Logos](https://icon-sets.iconify.design/logos)                                       | `@iconify-prerendered/vue-logos`                      | Oct 3, 2024   |
| [SVG Spinners](https://icon-sets.iconify.design/svg-spinners)                             | `@iconify-prerendered/vue-svg-spinners`               | Jan 15, 2023  |
| [System UIcons](https://icon-sets.iconify.design/system-uicons)                           | `@iconify-prerendered/vue-system-uicons`              | Aug 4, 2024   |
| [Tabler Icons](https://icon-sets.iconify.design/tabler)                                   | `@iconify-prerendered/vue-tabler`                     | Jan 8, 2025   |
| [TDesign Icons](https://icon-sets.iconify.design/tdesign)                                 | `@iconify-prerendered/vue-tdesign`                    | Jan 8, 2025   |
| [Teenyicons](https://icon-sets.iconify.design/teenyicons)                                 | `@iconify-prerendered/vue-teenyicons`                 | Aug 4, 2024   |
| [TopCoat Icons](https://icon-sets.iconify.design/topcoat)                                 | `@iconify-prerendered/vue-topcoat`                    | Aug 4, 2024   |
| [Twitter Emoji](https://icon-sets.iconify.design/twemoji)                                 | `@iconify-prerendered/vue-twemoji`                    | Aug 4, 2024   |
| [Typicons](https://icon-sets.iconify.design/typcn)                                        | `@iconify-prerendered/vue-typcn`                      | Aug 4, 2024   |
| [uiw icons](https://icon-sets.iconify.design/uiw)                                         | `@iconify-prerendered/vue-uiw`                        | Jun 24, 2024  |
| [Unicons](https://icon-sets.iconify.design/uil)                                           | `@iconify-prerendered/vue-uil`                        | Dec 17, 2024  |
| [Unicons Monochrome](https://icon-sets.iconify.design/uim)                                | `@iconify-prerendered/vue-uim`                        | Dec 17, 2024  |
| [Unicons Solid](https://icon-sets.iconify.design/uis)                                     | `@iconify-prerendered/vue-uis`                        | Dec 17, 2024  |
| [Unicons Thin Line](https://icon-sets.iconify.design/uit)                                 | `@iconify-prerendered/vue-uit`                        | Dec 17, 2024  |
| [UnJS Logos](https://icon-sets.iconify.design/unjs)                                       | `@iconify-prerendered/vue-unjs`                       | Jul 17, 2024  |
| [Vaadin Icons](https://icon-sets.iconify.design/vaadin)                                   | `@iconify-prerendered/vue-vaadin`                     | Aug 4, 2024   |
| [Vesper Icons](https://icon-sets.iconify.design/vs)                                       | `@iconify-prerendered/vue-vs`                         | Dec 11, 2023  |
| [VSCode Icons](https://icon-sets.iconify.design/vscode-icons)                             | `@iconify-prerendered/vue-vscode-icons`               | Jan 10, 2025  |
| [Weather Icons](https://icon-sets.iconify.design/wi)                                      | `@iconify-prerendered/vue-wi`                         | Aug 4, 2024   |
| [Web Symbols Liga](https://icon-sets.iconify.design/websymbol)                            | `@iconify-prerendered/vue-websymbol`                  | Dec 11, 2023  |
| [Web3 Icons](https://icon-sets.iconify.design/token)                                      | `@iconify-prerendered/vue-token`                      | Jan 14, 2025  |
| [Web3 Icons Branded](https://icon-sets.iconify.design/token-branded)                      | `@iconify-prerendered/vue-token-branded`              | Jan 14, 2025  |
| [WebHostingHub Glyphs](https://icon-sets.iconify.design/whh)                              | `@iconify-prerendered/vue-whh`                        | Aug 4, 2024   |
| [WeUI Icon](https://icon-sets.iconify.design/weui)                                        | `@iconify-prerendered/vue-weui`                       | Jun 20, 2024  |
| [Zondicons](https://icon-sets.iconify.design/zondicons)                                   | `@iconify-prerendered/vue-zondicons`                  | Aug 4, 2024   |

<!-- PACKAGE LIST END -->

## License

The code for generating the icon sets is distributed under the MIT license. The
icon sets themselves are distributed under the license of their author.

## Development setup

1. Install [Deno](https://deno.land/).
2. Run `deno task generate` for generate all collections. Params:
   - `--version` or `-v` specify version base for generated packages. Optional.
   - `--prefix` or `-p` specify with a collection to generate. Maybe multiple
     times. Optional.
   - `--no-replace-ids` disable replacing ids. Required for a test case.
     Optional.
   - `--output` or `-o` directory to place generated files. Optional.
3. Run `deno task test` for run all tests.
   [See more about test running](https://deno.land/manual@v1.30.1/basics/testing).

## Benchmarking

You can benchmark two versions of icon sets. To do that:

1. Generate _baseline_ icon set by command:
   `deno task generate -p=fluent-emoji -o=benckmarks/generated/baseline`
2. Make any changes to the generation process or whatever
3. Generate _tested_ icon set by command:
   `deno task generate -p=fluent-emoji -o=benckmarks/generated/test`
4. Run benchmark by `deno bench --allow-env`
5. Go to step #2
