# @iconify-prerendered
A superset standalone icon-components for Vue with zero dependencies. Designed for ease of use and high performance.

---

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)

---

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

**Live demo**: https://stackblitz.com/edit/iconify-prerendered-demo?file=src%2FApp.vue

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
Only these three icons will be included in your bundle. All other icons may be tree-shaken by your bundler.

That's all you need. No plugins, extra configs, IDE extensions or something else. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).

## Available icons sets
<!-- PACKAGE LIST START -->
| Icon set | Package | Last modified |
| --- | --- | --- |
|	[Academicons](https://icon-sets.iconify.design/academicons) | `@iconify-prerendered/vue-academicons`	|	Jan 2, 2023	|
|	[Akar Icons](https://icon-sets.iconify.design/akar-icons) | `@iconify-prerendered/vue-akar-icons`	|	Jan 2, 2023	|
|	[Ant Design Icons](https://icon-sets.iconify.design/ant-design) | `@iconify-prerendered/vue-ant-design`	|	Jun 25, 2022	|
|	[Arcticons](https://icon-sets.iconify.design/arcticons) | `@iconify-prerendered/vue-arcticons`	|	Jan 6, 2023	|
|	[Bootstrap Icons](https://icon-sets.iconify.design/bi) | `@iconify-prerendered/vue-bi`	|	Jan 2, 2023	|
|	[BoxIcons](https://icon-sets.iconify.design/bx) | `@iconify-prerendered/vue-bx`	|	Sep 20, 2022	|
|	[BoxIcons Logo](https://icon-sets.iconify.design/bxl) | `@iconify-prerendered/vue-bxl`	|	Sep 20, 2022	|
|	[BoxIcons Solid](https://icon-sets.iconify.design/bxs) | `@iconify-prerendered/vue-bxs`	|	Sep 20, 2022	|
|	[BPMN](https://icon-sets.iconify.design/bpmn) | `@iconify-prerendered/vue-bpmn`	|	Jun 25, 2022	|
|	[Brandico](https://icon-sets.iconify.design/brandico) | `@iconify-prerendered/vue-brandico`	|	Jun 25, 2022	|
|	[Bytesize Icons](https://icon-sets.iconify.design/bytesize) | `@iconify-prerendered/vue-bytesize`	|	Jun 25, 2022	|
|	[Carbon](https://icon-sets.iconify.design/carbon) | `@iconify-prerendered/vue-carbon`	|	Jan 2, 2023	|
|	[Charm Icons](https://icon-sets.iconify.design/charm) | `@iconify-prerendered/vue-charm`	|	Dec 2, 2022	|
|	[Circle Flags](https://icon-sets.iconify.design/circle-flags) | `@iconify-prerendered/vue-circle-flags`	|	Jan 2, 2023	|
|	[Circum Icons](https://icon-sets.iconify.design/circum) | `@iconify-prerendered/vue-circum`	|	Jan 2, 2023	|
|	[Clarity](https://icon-sets.iconify.design/clarity) | `@iconify-prerendered/vue-clarity`	|	Jan 2, 2023	|
|	[Codicons](https://icon-sets.iconify.design/codicon) | `@iconify-prerendered/vue-codicon`	|	Dec 16, 2022	|
|	[coolicons](https://icon-sets.iconify.design/ci) | `@iconify-prerendered/vue-ci`	|	Jan 2, 2023	|
|	[CoreUI Brands](https://icon-sets.iconify.design/cib) | `@iconify-prerendered/vue-cib`	|	Jun 25, 2022	|
|	[CoreUI Flags](https://icon-sets.iconify.design/cif) | `@iconify-prerendered/vue-cif`	|	Jan 2, 2023	|
|	[CoreUI Free](https://icon-sets.iconify.design/cil) | `@iconify-prerendered/vue-cil`	|	Jun 25, 2022	|
|	[Cryptocurrency Color Icons](https://icon-sets.iconify.design/cryptocurrency-color) | `@iconify-prerendered/vue-cryptocurrency-color`	|	Jan 2, 2023	|
|	[Cryptocurrency Icons](https://icon-sets.iconify.design/cryptocurrency) | `@iconify-prerendered/vue-cryptocurrency`	|	Aug 24, 2022	|
|	[css.gg](https://icon-sets.iconify.design/gg) | `@iconify-prerendered/vue-gg`	|	Jun 25, 2022	|
|	[Dashicons](https://icon-sets.iconify.design/dashicons) | `@iconify-prerendered/vue-dashicons`	|	Jun 25, 2022	|
|	[Elegant](https://icon-sets.iconify.design/et) | `@iconify-prerendered/vue-et`	|	Jun 25, 2022	|
|	[Element Plus](https://icon-sets.iconify.design/ep) | `@iconify-prerendered/vue-ep`	|	Aug 12, 2022	|
|	[Elusive Icons](https://icon-sets.iconify.design/el) | `@iconify-prerendered/vue-el`	|	Jun 25, 2022	|
|	[Emoji One (Colored)](https://icon-sets.iconify.design/emojione) | `@iconify-prerendered/vue-emojione`	|	Jan 2, 2023	|
|	[Emoji One (Monotone)](https://icon-sets.iconify.design/emojione-monotone) | `@iconify-prerendered/vue-emojione-monotone`	|	Jun 25, 2022	|
|	[Emoji One (v1)](https://icon-sets.iconify.design/emojione-v1) | `@iconify-prerendered/vue-emojione-v1`	|	Jan 2, 2023	|
|	[Entypo+](https://icon-sets.iconify.design/entypo) | `@iconify-prerendered/vue-entypo`	|	Jun 25, 2022	|
|	[Entypo+ Social](https://icon-sets.iconify.design/entypo-social) | `@iconify-prerendered/vue-entypo-social`	|	Jun 25, 2022	|
|	[EOS Icons](https://icon-sets.iconify.design/eos-icons) | `@iconify-prerendered/vue-eos-icons`	|	Jan 2, 2023	|
|	[Eva Icons](https://icon-sets.iconify.design/eva) | `@iconify-prerendered/vue-eva`	|	Jan 2, 2023	|
|	[Evil Icons](https://icon-sets.iconify.design/ei) | `@iconify-prerendered/vue-ei`	|	Jun 25, 2022	|
|	[Feather Icon](https://icon-sets.iconify.design/fe) | `@iconify-prerendered/vue-fe`	|	Jan 2, 2023	|
|	[Feather Icons](https://icon-sets.iconify.design/feather) | `@iconify-prerendered/vue-feather`	|	Jun 25, 2022	|
|	[File Icons](https://icon-sets.iconify.design/file-icons) | `@iconify-prerendered/vue-file-icons`	|	Jun 25, 2022	|
|	[Firefox OS Emoji](https://icon-sets.iconify.design/fxemoji) | `@iconify-prerendered/vue-fxemoji`	|	Jun 25, 2022	|
|	[Flag Icons](https://icon-sets.iconify.design/flag) | `@iconify-prerendered/vue-flag`	|	Jan 2, 2023	|
|	[Flagpack](https://icon-sets.iconify.design/flagpack) | `@iconify-prerendered/vue-flagpack`	|	Jan 2, 2023	|
|	[Flat Color Icons](https://icon-sets.iconify.design/flat-color-icons) | `@iconify-prerendered/vue-flat-color-icons`	|	Jan 2, 2023	|
|	[Flat UI Icons](https://icon-sets.iconify.design/flat-ui) | `@iconify-prerendered/vue-flat-ui`	|	Jan 2, 2023	|
|	[Fluent Emoji](https://icon-sets.iconify.design/fluent-emoji) | `@iconify-prerendered/vue-fluent-emoji`	|	Jan 2, 2023	|
|	[Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat) | `@iconify-prerendered/vue-fluent-emoji-flat`	|	Jan 2, 2023	|
|	[Fluent Emoji High Contrast](https://icon-sets.iconify.design/fluent-emoji-high-contrast) | `@iconify-prerendered/vue-fluent-emoji-high-contrast`	|	Jan 2, 2023	|
|	[Fluent UI MDL2](https://icon-sets.iconify.design/fluent-mdl2) | `@iconify-prerendered/vue-fluent-mdl2`	|	Oct 13, 2022	|
|	[Fluent UI System Icons](https://icon-sets.iconify.design/fluent) | `@iconify-prerendered/vue-fluent`	|	Aug 22, 2022	|
|	[Font Awesome 4](https://icon-sets.iconify.design/fa) | `@iconify-prerendered/vue-fa`	|	Jun 25, 2022	|
|	[Font Awesome 5 Brands](https://icon-sets.iconify.design/fa-brands) | `@iconify-prerendered/vue-fa-brands`	|	Jun 25, 2022	|
|	[Font Awesome 5 Regular](https://icon-sets.iconify.design/fa-regular) | `@iconify-prerendered/vue-fa-regular`	|	Jun 25, 2022	|
|	[Font Awesome 5 Solid](https://icon-sets.iconify.design/fa-solid) | `@iconify-prerendered/vue-fa-solid`	|	Jun 25, 2022	|
|	[Font Awesome Brands](https://icon-sets.iconify.design/fa6-brands) | `@iconify-prerendered/vue-fa6-brands`	|	Sep 2, 2022	|
|	[Font Awesome Regular](https://icon-sets.iconify.design/fa6-regular) | `@iconify-prerendered/vue-fa6-regular`	|	Nov 16, 2022	|
|	[Font Awesome Solid](https://icon-sets.iconify.design/fa6-solid) | `@iconify-prerendered/vue-fa6-solid`	|	Nov 16, 2022	|
|	[Font-GIS](https://icon-sets.iconify.design/gis) | `@iconify-prerendered/vue-gis`	|	Jan 2, 2023	|
|	[FontAudio](https://icon-sets.iconify.design/fad) | `@iconify-prerendered/vue-fad`	|	Dec 9, 2022	|
|	[Fontelico](https://icon-sets.iconify.design/fontelico) | `@iconify-prerendered/vue-fontelico`	|	Jun 25, 2022	|
|	[Fontisto](https://icon-sets.iconify.design/fontisto) | `@iconify-prerendered/vue-fontisto`	|	Jun 25, 2022	|
|	[Foundation](https://icon-sets.iconify.design/foundation) | `@iconify-prerendered/vue-foundation`	|	Jun 25, 2022	|
|	[Gala Icons](https://icon-sets.iconify.design/gala) | `@iconify-prerendered/vue-gala`	|	Jan 2, 2023	|
|	[Game Icons](https://icon-sets.iconify.design/game-icons) | `@iconify-prerendered/vue-game-icons`	|	Sep 27, 2022	|
|	[GeoGlyphs](https://icon-sets.iconify.design/geo) | `@iconify-prerendered/vue-geo`	|	Jun 25, 2022	|
|	[Gitlab SVGs](https://icon-sets.iconify.design/pajamas) | `@iconify-prerendered/vue-pajamas`	|	Dec 16, 2022	|
|	[Google Material Icons](https://icon-sets.iconify.design/ic) | `@iconify-prerendered/vue-ic`	|	Jan 2, 2023	|
|	[Gridicons](https://icon-sets.iconify.design/gridicons) | `@iconify-prerendered/vue-gridicons`	|	Jan 2, 2023	|
|	[Grommet Icons](https://icon-sets.iconify.design/grommet-icons) | `@iconify-prerendered/vue-grommet-icons`	|	Jun 25, 2022	|
|	[Health Icons](https://icon-sets.iconify.design/healthicons) | `@iconify-prerendered/vue-healthicons`	|	Jan 2, 2023	|
|	[HeroIcons](https://icon-sets.iconify.design/heroicons) | `@iconify-prerendered/vue-heroicons`	|	Jan 2, 2023	|
|	[HeroIcons v1 Outline](https://icon-sets.iconify.design/heroicons-outline) | `@iconify-prerendered/vue-heroicons-outline`	|	Aug 24, 2022	|
|	[HeroIcons v1 Solid](https://icon-sets.iconify.design/heroicons-solid) | `@iconify-prerendered/vue-heroicons-solid`	|	Aug 26, 2022	|
|	[Humbleicons](https://icon-sets.iconify.design/humbleicons) | `@iconify-prerendered/vue-humbleicons`	|	Oct 21, 2022	|
|	[Icalicons](https://icon-sets.iconify.design/il) | `@iconify-prerendered/vue-il`	|	Jun 25, 2022	|
|	[IcoMoon Free](https://icon-sets.iconify.design/icomoon-free) | `@iconify-prerendered/vue-icomoon-free`	|	Jun 25, 2022	|
|	[Iconoir](https://icon-sets.iconify.design/iconoir) | `@iconify-prerendered/vue-iconoir`	|	Jan 9, 2023	|
|	[IconPark](https://icon-sets.iconify.design/icon-park) | `@iconify-prerendered/vue-icon-park`	|	Jan 2, 2023	|
|	[IconPark Outline](https://icon-sets.iconify.design/icon-park-outline) | `@iconify-prerendered/vue-icon-park-outline`	|	Jan 2, 2023	|
|	[IconPark Solid](https://icon-sets.iconify.design/icon-park-solid) | `@iconify-prerendered/vue-icon-park-solid`	|	Jan 2, 2023	|
|	[IconPark TwoTone](https://icon-sets.iconify.design/icon-park-twotone) | `@iconify-prerendered/vue-icon-park-twotone`	|	Jan 2, 2023	|
|	[Icons8 Windows 10 Icons](https://icon-sets.iconify.design/icons8) | `@iconify-prerendered/vue-icons8`	|	Jun 25, 2022	|
|	[Icons8 Windows 8 Icons](https://icon-sets.iconify.design/wpf) | `@iconify-prerendered/vue-wpf`	|	Jun 25, 2022	|
|	[Innowatio Font](https://icon-sets.iconify.design/iwwa) | `@iconify-prerendered/vue-iwwa`	|	Jun 25, 2022	|
|	[IonIcons](https://icon-sets.iconify.design/ion) | `@iconify-prerendered/vue-ion`	|	Jan 2, 2023	|
|	[Jam Icons](https://icon-sets.iconify.design/jam) | `@iconify-prerendered/vue-jam`	|	Jun 25, 2022	|
|	[Ligature Symbols](https://icon-sets.iconify.design/ls) | `@iconify-prerendered/vue-ls`	|	Jun 25, 2022	|
|	[Line Awesome](https://icon-sets.iconify.design/la) | `@iconify-prerendered/vue-la`	|	Jun 25, 2022	|
|	[Lucide](https://icon-sets.iconify.design/lucide) | `@iconify-prerendered/vue-lucide`	|	Nov 22, 2022	|
|	[Majesticons](https://icon-sets.iconify.design/majesticons) | `@iconify-prerendered/vue-majesticons`	|	Jan 2, 2023	|
|	[Maki](https://icon-sets.iconify.design/maki) | `@iconify-prerendered/vue-maki`	|	Jan 2, 2023	|
|	[Map Icons](https://icon-sets.iconify.design/map) | `@iconify-prerendered/vue-map`	|	Jun 25, 2022	|
|	[Material Design Iconic Font](https://icon-sets.iconify.design/zmdi) | `@iconify-prerendered/vue-zmdi`	|	Jun 25, 2022	|
|	[Material Design Icons](https://icon-sets.iconify.design/mdi) | `@iconify-prerendered/vue-mdi`	|	Dec 30, 2022	|
|	[Material Design Light](https://icon-sets.iconify.design/mdi-light) | `@iconify-prerendered/vue-mdi-light`	|	Dec 16, 2022	|
|	[Material Line Icons](https://icon-sets.iconify.design/line-md) | `@iconify-prerendered/vue-line-md`	|	Jan 2, 2023	|
|	[Material Symbols](https://icon-sets.iconify.design/material-symbols) | `@iconify-prerendered/vue-material-symbols`	|	Dec 9, 2022	|
|	[Medical Icons](https://icon-sets.iconify.design/medical-icon) | `@iconify-prerendered/vue-medical-icon`	|	Jun 25, 2022	|
|	[MingCute Icon](https://icon-sets.iconify.design/mingcute) | `@iconify-prerendered/vue-mingcute`	|	Nov 9, 2022	|
|	[Mono Icons](https://icon-sets.iconify.design/mi) | `@iconify-prerendered/vue-mi`	|	Jun 25, 2022	|
|	[Mono Icons](https://icon-sets.iconify.design/mono-icons) | `@iconify-prerendered/vue-mono-icons`	|	Jun 25, 2022	|
|	[Nimbus](https://icon-sets.iconify.design/nimbus) | `@iconify-prerendered/vue-nimbus`	|	Oct 28, 2022	|
|	[Noto Emoji](https://icon-sets.iconify.design/noto) | `@iconify-prerendered/vue-noto`	|	Jan 2, 2023	|
|	[Noto Emoji (v1)](https://icon-sets.iconify.design/noto-v1) | `@iconify-prerendered/vue-noto-v1`	|	Jan 2, 2023	|
|	[Octicons](https://icon-sets.iconify.design/octicon) | `@iconify-prerendered/vue-octicon`	|	Jan 6, 2023	|
|	[OOUI](https://icon-sets.iconify.design/ooui) | `@iconify-prerendered/vue-ooui`	|	Jan 2, 2023	|
|	[Open Iconic](https://icon-sets.iconify.design/oi) | `@iconify-prerendered/vue-oi`	|	Jun 25, 2022	|
|	[OpenMoji](https://icon-sets.iconify.design/openmoji) | `@iconify-prerendered/vue-openmoji`	|	Jan 9, 2023	|
|	[Pepicons](https://icon-sets.iconify.design/pepicons) | `@iconify-prerendered/vue-pepicons`	|	Jan 2, 2023	|
|	[Pepicons Pop!](https://icon-sets.iconify.design/pepicons-pop) | `@iconify-prerendered/vue-pepicons-pop`	|	Jan 2, 2023	|
|	[Pepicons Print](https://icon-sets.iconify.design/pepicons-print) | `@iconify-prerendered/vue-pepicons-print`	|	Jan 2, 2023	|
|	[Phosphor](https://icon-sets.iconify.design/ph) | `@iconify-prerendered/vue-ph`	|	Jun 25, 2022	|
|	[Pixelarticons](https://icon-sets.iconify.design/pixelarticons) | `@iconify-prerendered/vue-pixelarticons`	|	Aug 22, 2022	|
|	[PrestaShop Icons](https://icon-sets.iconify.design/ps) | `@iconify-prerendered/vue-ps`	|	Jun 25, 2022	|
|	[Prime Icons](https://icon-sets.iconify.design/prime) | `@iconify-prerendered/vue-prime`	|	Sep 16, 2022	|
|	[Quill Icons](https://icon-sets.iconify.design/quill) | `@iconify-prerendered/vue-quill`	|	Jan 2, 2023	|
|	[Radix Icons](https://icon-sets.iconify.design/radix-icons) | `@iconify-prerendered/vue-radix-icons`	|	Jan 2, 2023	|
|	[Raphael](https://icon-sets.iconify.design/raphael) | `@iconify-prerendered/vue-raphael`	|	Jun 25, 2022	|
|	[Remix Icon](https://icon-sets.iconify.design/ri) | `@iconify-prerendered/vue-ri`	|	Jun 25, 2022	|
|	[Simple Icons](https://icon-sets.iconify.design/simple-icons) | `@iconify-prerendered/vue-simple-icons`	|	Dec 30, 2022	|
|	[Simple line icons](https://icon-sets.iconify.design/simple-line-icons) | `@iconify-prerendered/vue-simple-line-icons`	|	Jun 25, 2022	|
|	[SmartIcons Glyph](https://icon-sets.iconify.design/si-glyph) | `@iconify-prerendered/vue-si-glyph`	|	Jan 2, 2023	|
|	[Subway Icon Set](https://icon-sets.iconify.design/subway) | `@iconify-prerendered/vue-subway`	|	Oct 11, 2022	|
|	[SVG Logos](https://icon-sets.iconify.design/logos) | `@iconify-prerendered/vue-logos`	|	Jan 9, 2023	|
|	[System UIcons](https://icon-sets.iconify.design/system-uicons) | `@iconify-prerendered/vue-system-uicons`	|	Jan 2, 2023	|
|	[Tabler Icons](https://icon-sets.iconify.design/tabler) | `@iconify-prerendered/vue-tabler`	|	Dec 30, 2022	|
|	[Teenyicons](https://icon-sets.iconify.design/teenyicons) | `@iconify-prerendered/vue-teenyicons`	|	Jun 26, 2022	|
|	[TopCoat Icons](https://icon-sets.iconify.design/topcoat) | `@iconify-prerendered/vue-topcoat`	|	Jun 25, 2022	|
|	[Twitter Emoji](https://icon-sets.iconify.design/twemoji) | `@iconify-prerendered/vue-twemoji`	|	Jan 2, 2023	|
|	[Typicons](https://icon-sets.iconify.design/typcn) | `@iconify-prerendered/vue-typcn`	|	Jun 25, 2022	|
|	[uiw icons](https://icon-sets.iconify.design/uiw) | `@iconify-prerendered/vue-uiw`	|	Jan 2, 2023	|
|	[Unicons](https://icon-sets.iconify.design/uil) | `@iconify-prerendered/vue-uil`	|	Jun 25, 2022	|
|	[Unicons Monochrome](https://icon-sets.iconify.design/uim) | `@iconify-prerendered/vue-uim`	|	Jun 25, 2022	|
|	[Unicons Solid](https://icon-sets.iconify.design/uis) | `@iconify-prerendered/vue-uis`	|	Jun 25, 2022	|
|	[Unicons Thin Line](https://icon-sets.iconify.design/uit) | `@iconify-prerendered/vue-uit`	|	Jun 25, 2022	|
|	[Vaadin Icons](https://icon-sets.iconify.design/vaadin) | `@iconify-prerendered/vue-vaadin`	|	Jun 25, 2022	|
|	[Vesper Icons](https://icon-sets.iconify.design/vs) | `@iconify-prerendered/vue-vs`	|	Jun 25, 2022	|
|	[VSCode Icons](https://icon-sets.iconify.design/vscode-icons) | `@iconify-prerendered/vue-vscode-icons`	|	Jan 2, 2023	|
|	[Weather Icons](https://icon-sets.iconify.design/wi) | `@iconify-prerendered/vue-wi`	|	Jun 25, 2022	|
|	[Web Symbols Liga](https://icon-sets.iconify.design/websymbol) | `@iconify-prerendered/vue-websymbol`	|	Jun 25, 2022	|
|	[WebHostingHub Glyphs](https://icon-sets.iconify.design/whh) | `@iconify-prerendered/vue-whh`	|	Jun 25, 2022	|
|	[Zondicons](https://icon-sets.iconify.design/zondicons) | `@iconify-prerendered/vue-zondicons`	|	Nov 22, 2022	|

<!-- PACKAGE LIST END -->

## License
The code for generating the icon sets is distributed under the MIT license. The icon sets themselves are distributed under the license of their author.
