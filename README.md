# @iconify-prerendered
A superset standalone icon-components for Vue with zero dependencies. Designed for excellent tree shaking.

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)

Each icon in any set is standalone component, so you can easily use it.
- No plugins required. Compatible with any builder.
- The icon code is embedded in your bundle.
- Supports tree shaking, so only those icons that you have used will be included in the bundle.
- Works offline.
- Does not require any external resources like fonts or css.
- Zero dependencies.
- Powered by [iconify](https://iconify.design/).

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
import { IconAccount } from '@iconify-prerendered/vue-mdi' 
</script>

<template>
<a>
  <IconAccount/>
  Go to account
</a>
</template>
```

That's all you need. No bundler plugins or IDE extensions. [It just works](https://twitter.com/alex_kozack/status/1560608558127140865).

## Available icons sets
<!-- PACKAGE LIST START -->
| Icon set | Package | Last modified |
| --- | --- | --- |
|	[Academicons](https://icon-sets.iconify.design/academicons) | `@iconify-prerendered/vue-academicons`	|	Sat Jun 25 2022	|
|	[Akar Icons](https://icon-sets.iconify.design/akar-icons) | `@iconify-prerendered/vue-akar-icons`	|	Wed Jul 27 2022	|
|	[Ant Design Icons](https://icon-sets.iconify.design/ant-design) | `@iconify-prerendered/vue-ant-design`	|	Sat Jun 25 2022	|
|	[Arcticons](https://icon-sets.iconify.design/arcticons) | `@iconify-prerendered/vue-arcticons`	|	Wed Jul 27 2022	|
|	[Bootstrap Icons](https://icon-sets.iconify.design/bi) | `@iconify-prerendered/vue-bi`	|	Mon Jul 18 2022	|
|	[BoxIcons](https://icon-sets.iconify.design/bx) | `@iconify-prerendered/vue-bx`	|	Sat Jun 25 2022	|
|	[BoxIcons Logo](https://icon-sets.iconify.design/bxl) | `@iconify-prerendered/vue-bxl`	|	Sat Jun 25 2022	|
|	[BoxIcons Solid](https://icon-sets.iconify.design/bxs) | `@iconify-prerendered/vue-bxs`	|	Sat Jun 25 2022	|
|	[BPMN](https://icon-sets.iconify.design/bpmn) | `@iconify-prerendered/vue-bpmn`	|	Sat Jun 25 2022	|
|	[Brandico](https://icon-sets.iconify.design/brandico) | `@iconify-prerendered/vue-brandico`	|	Sat Jun 25 2022	|
|	[Bytesize Icons](https://icon-sets.iconify.design/bytesize) | `@iconify-prerendered/vue-bytesize`	|	Sat Jun 25 2022	|
|	[Carbon](https://icon-sets.iconify.design/carbon) | `@iconify-prerendered/vue-carbon`	|	Mon Jul 25 2022	|
|	[Charm Icons](https://icon-sets.iconify.design/charm) | `@iconify-prerendered/vue-charm`	|	Mon Aug 15 2022	|
|	[Circle Flags](https://icon-sets.iconify.design/circle-flags) | `@iconify-prerendered/vue-circle-flags`	|	Sat Aug 13 2022	|
|	[Clarity](https://icon-sets.iconify.design/clarity) | `@iconify-prerendered/vue-clarity`	|	Sat Jun 25 2022	|
|	[Codicons](https://icon-sets.iconify.design/codicon) | `@iconify-prerendered/vue-codicon`	|	Fri Aug 19 2022	|
|	[coolicons](https://icon-sets.iconify.design/ci) | `@iconify-prerendered/vue-ci`	|	Sat Jun 25 2022	|
|	[CoreUI Brands](https://icon-sets.iconify.design/cib) | `@iconify-prerendered/vue-cib`	|	Sat Jun 25 2022	|
|	[CoreUI Flags](https://icon-sets.iconify.design/cif) | `@iconify-prerendered/vue-cif`	|	Sat Jun 25 2022	|
|	[CoreUI Free](https://icon-sets.iconify.design/cil) | `@iconify-prerendered/vue-cil`	|	Sat Jun 25 2022	|
|	[Cryptocurrency Icons](https://icon-sets.iconify.design/cryptocurrency) | `@iconify-prerendered/vue-cryptocurrency`	|	Sat Jun 25 2022	|
|	[css.gg](https://icon-sets.iconify.design/gg) | `@iconify-prerendered/vue-gg`	|	Sat Jun 25 2022	|
|	[Dashicons](https://icon-sets.iconify.design/dashicons) | `@iconify-prerendered/vue-dashicons`	|	Sat Jun 25 2022	|
|	[Elegant](https://icon-sets.iconify.design/et) | `@iconify-prerendered/vue-et`	|	Sat Jun 25 2022	|
|	[Element Plus](https://icon-sets.iconify.design/ep) | `@iconify-prerendered/vue-ep`	|	Fri Aug 12 2022	|
|	[Elusive Icons](https://icon-sets.iconify.design/el) | `@iconify-prerendered/vue-el`	|	Sat Jun 25 2022	|
|	[Emoji One (Colored)](https://icon-sets.iconify.design/emojione) | `@iconify-prerendered/vue-emojione`	|	Sat Jun 25 2022	|
|	[Emoji One (Monotone)](https://icon-sets.iconify.design/emojione-monotone) | `@iconify-prerendered/vue-emojione-monotone`	|	Sat Jun 25 2022	|
|	[Emoji One (v1)](https://icon-sets.iconify.design/emojione-v1) | `@iconify-prerendered/vue-emojione-v1`	|	Sat Jun 25 2022	|
|	[Entypo+](https://icon-sets.iconify.design/entypo) | `@iconify-prerendered/vue-entypo`	|	Sat Jun 25 2022	|
|	[Entypo+ Social](https://icon-sets.iconify.design/entypo-social) | `@iconify-prerendered/vue-entypo-social`	|	Sat Jun 25 2022	|
|	[EOS Icons](https://icon-sets.iconify.design/eos-icons) | `@iconify-prerendered/vue-eos-icons`	|	Sat Jun 25 2022	|
|	[Eva Icons](https://icon-sets.iconify.design/eva) | `@iconify-prerendered/vue-eva`	|	Sat Jun 25 2022	|
|	[Evil Icons](https://icon-sets.iconify.design/ei) | `@iconify-prerendered/vue-ei`	|	Sat Jun 25 2022	|
|	[Feather Icon](https://icon-sets.iconify.design/fe) | `@iconify-prerendered/vue-fe`	|	Sat Jun 25 2022	|
|	[Feather Icons](https://icon-sets.iconify.design/feather) | `@iconify-prerendered/vue-feather`	|	Sat Jun 25 2022	|
|	[File Icons](https://icon-sets.iconify.design/file-icons) | `@iconify-prerendered/vue-file-icons`	|	Sat Jun 25 2022	|
|	[Firefox OS Emoji](https://icon-sets.iconify.design/fxemoji) | `@iconify-prerendered/vue-fxemoji`	|	Sat Jun 25 2022	|
|	[Flag Icons](https://icon-sets.iconify.design/flag) | `@iconify-prerendered/vue-flag`	|	Fri Jul 08 2022	|
|	[Flagpack](https://icon-sets.iconify.design/flagpack) | `@iconify-prerendered/vue-flagpack`	|	Sat Jun 25 2022	|
|	[Flat Color Icons](https://icon-sets.iconify.design/flat-color-icons) | `@iconify-prerendered/vue-flat-color-icons`	|	Sat Jun 25 2022	|
|	[Flat UI Icons](https://icon-sets.iconify.design/flat-ui) | `@iconify-prerendered/vue-flat-ui`	|	Sat Jun 25 2022	|
|	[Fluent Emoji](https://icon-sets.iconify.design/fluent-emoji) | `@iconify-prerendered/vue-fluent-emoji`	|	Fri Aug 12 2022	|
|	[Fluent Emoji Flat](https://icon-sets.iconify.design/fluent-emoji-flat) | `@iconify-prerendered/vue-fluent-emoji-flat`	|	Sat Aug 13 2022	|
|	[Fluent Emoji High Contrast](https://icon-sets.iconify.design/fluent-emoji-high-contrast) | `@iconify-prerendered/vue-fluent-emoji-high-contrast`	|	Sat Aug 13 2022	|
|	[Fluent UI System Icons](https://icon-sets.iconify.design/fluent) | `@iconify-prerendered/vue-fluent`	|	Mon Aug 01 2022	|
|	[Font Awesome 4](https://icon-sets.iconify.design/fa) | `@iconify-prerendered/vue-fa`	|	Sat Jun 25 2022	|
|	[Font Awesome 5 Brands](https://icon-sets.iconify.design/fa-brands) | `@iconify-prerendered/vue-fa-brands`	|	Sat Jun 25 2022	|
|	[Font Awesome 5 Regular](https://icon-sets.iconify.design/fa-regular) | `@iconify-prerendered/vue-fa-regular`	|	Sat Jun 25 2022	|
|	[Font Awesome 5 Solid](https://icon-sets.iconify.design/fa-solid) | `@iconify-prerendered/vue-fa-solid`	|	Sat Jun 25 2022	|
|	[Font Awesome Brands](https://icon-sets.iconify.design/fa6-brands) | `@iconify-prerendered/vue-fa6-brands`	|	Tue Jul 26 2022	|
|	[Font Awesome Regular](https://icon-sets.iconify.design/fa6-regular) | `@iconify-prerendered/vue-fa6-regular`	|	Tue Jul 26 2022	|
|	[Font Awesome Solid](https://icon-sets.iconify.design/fa6-solid) | `@iconify-prerendered/vue-fa6-solid`	|	Tue Jul 26 2022	|
|	[Font-GIS](https://icon-sets.iconify.design/gis) | `@iconify-prerendered/vue-gis`	|	Sat Jun 25 2022	|
|	[FontAudio](https://icon-sets.iconify.design/fad) | `@iconify-prerendered/vue-fad`	|	Sat Jun 25 2022	|
|	[Fontelico](https://icon-sets.iconify.design/fontelico) | `@iconify-prerendered/vue-fontelico`	|	Sat Jun 25 2022	|
|	[Fontisto](https://icon-sets.iconify.design/fontisto) | `@iconify-prerendered/vue-fontisto`	|	Sat Jun 25 2022	|
|	[Foundation](https://icon-sets.iconify.design/foundation) | `@iconify-prerendered/vue-foundation`	|	Sat Jun 25 2022	|
|	[Gala Icons](https://icon-sets.iconify.design/gala) | `@iconify-prerendered/vue-gala`	|	Mon Aug 08 2022	|
|	[GeoGlyphs](https://icon-sets.iconify.design/geo) | `@iconify-prerendered/vue-geo`	|	Sat Jun 25 2022	|
|	[Google Material Icons](https://icon-sets.iconify.design/ic) | `@iconify-prerendered/vue-ic`	|	Sat Aug 13 2022	|
|	[Gridicons](https://icon-sets.iconify.design/gridicons) | `@iconify-prerendered/vue-gridicons`	|	Sat Jun 25 2022	|
|	[Grommet Icons](https://icon-sets.iconify.design/grommet-icons) | `@iconify-prerendered/vue-grommet-icons`	|	Sat Jun 25 2022	|
|	[Health Icons](https://icon-sets.iconify.design/healthicons) | `@iconify-prerendered/vue-healthicons`	|	Sat Jun 25 2022	|
|	[HeroIcons Outline](https://icon-sets.iconify.design/heroicons-outline) | `@iconify-prerendered/vue-heroicons-outline`	|	Sat Jun 25 2022	|
|	[HeroIcons Solid](https://icon-sets.iconify.design/heroicons-solid) | `@iconify-prerendered/vue-heroicons-solid`	|	Sat Jun 25 2022	|
|	[Humbleicons](https://icon-sets.iconify.design/humbleicons) | `@iconify-prerendered/vue-humbleicons`	|	Mon Jul 25 2022	|
|	[Icalicons](https://icon-sets.iconify.design/il) | `@iconify-prerendered/vue-il`	|	Sat Jun 25 2022	|
|	[IcoMoon Free](https://icon-sets.iconify.design/icomoon-free) | `@iconify-prerendered/vue-icomoon-free`	|	Sat Jun 25 2022	|
|	[Iconoir](https://icon-sets.iconify.design/iconoir) | `@iconify-prerendered/vue-iconoir`	|	Sat Jun 25 2022	|
|	[IconPark](https://icon-sets.iconify.design/icon-park) | `@iconify-prerendered/vue-icon-park`	|	Sat Jun 25 2022	|
|	[IconPark Outline](https://icon-sets.iconify.design/icon-park-outline) | `@iconify-prerendered/vue-icon-park-outline`	|	Sat Jun 25 2022	|
|	[IconPark Solid](https://icon-sets.iconify.design/icon-park-solid) | `@iconify-prerendered/vue-icon-park-solid`	|	Sat Jun 25 2022	|
|	[IconPark TwoTone](https://icon-sets.iconify.design/icon-park-twotone) | `@iconify-prerendered/vue-icon-park-twotone`	|	Sat Jun 25 2022	|
|	[Icons8 Windows 10 Icons](https://icon-sets.iconify.design/icons8) | `@iconify-prerendered/vue-icons8`	|	Sat Jun 25 2022	|
|	[Icons8 Windows 8 Icons](https://icon-sets.iconify.design/wpf) | `@iconify-prerendered/vue-wpf`	|	Sat Jun 25 2022	|
|	[Innowatio Font](https://icon-sets.iconify.design/iwwa) | `@iconify-prerendered/vue-iwwa`	|	Sat Jun 25 2022	|
|	[IonIcons](https://icon-sets.iconify.design/ion) | `@iconify-prerendered/vue-ion`	|	Sat Jun 25 2022	|
|	[Jam Icons](https://icon-sets.iconify.design/jam) | `@iconify-prerendered/vue-jam`	|	Sat Jun 25 2022	|
|	[Ligature Symbols](https://icon-sets.iconify.design/ls) | `@iconify-prerendered/vue-ls`	|	Sat Jun 25 2022	|
|	[Line Awesome](https://icon-sets.iconify.design/la) | `@iconify-prerendered/vue-la`	|	Sat Jun 25 2022	|
|	[Lucide](https://icon-sets.iconify.design/lucide) | `@iconify-prerendered/vue-lucide`	|	Fri Aug 19 2022	|
|	[Majesticons](https://icon-sets.iconify.design/majesticons) | `@iconify-prerendered/vue-majesticons`	|	Wed Jul 06 2022	|
|	[Maki](https://icon-sets.iconify.design/maki) | `@iconify-prerendered/vue-maki`	|	Wed Jul 13 2022	|
|	[Map Icons](https://icon-sets.iconify.design/map) | `@iconify-prerendered/vue-map`	|	Sat Jun 25 2022	|
|	[Material Design Iconic Font](https://icon-sets.iconify.design/zmdi) | `@iconify-prerendered/vue-zmdi`	|	Sat Jun 25 2022	|
|	[Material Design Icons](https://icon-sets.iconify.design/mdi) | `@iconify-prerendered/vue-mdi`	|	Wed Aug 10 2022	|
|	[Material Design Light](https://icon-sets.iconify.design/mdi-light) | `@iconify-prerendered/vue-mdi-light`	|	Sat Jun 25 2022	|
|	[Material Line Icons](https://icon-sets.iconify.design/line-md) | `@iconify-prerendered/vue-line-md`	|	Mon Aug 08 2022	|
|	[Material Symbols](https://icon-sets.iconify.design/material-symbols) | `@iconify-prerendered/vue-material-symbols`	|	Fri Aug 12 2022	|
|	[Medical Icons](https://icon-sets.iconify.design/medical-icon) | `@iconify-prerendered/vue-medical-icon`	|	Sat Jun 25 2022	|
|	[Mono Icons](https://icon-sets.iconify.design/mi) | `@iconify-prerendered/vue-mi`	|	Sat Jun 25 2022	|
|	[Mono Icons](https://icon-sets.iconify.design/mono-icons) | `@iconify-prerendered/vue-mono-icons`	|	Sat Jun 25 2022	|
|	[Nimbus](https://icon-sets.iconify.design/nimbus) | `@iconify-prerendered/vue-nimbus`	|	Sat Jun 25 2022	|
|	[Noto Emoji](https://icon-sets.iconify.design/noto) | `@iconify-prerendered/vue-noto`	|	Sat Jun 25 2022	|
|	[Noto Emoji (v1)](https://icon-sets.iconify.design/noto-v1) | `@iconify-prerendered/vue-noto-v1`	|	Sat Jun 25 2022	|
|	[Octicons](https://icon-sets.iconify.design/octicon) | `@iconify-prerendered/vue-octicon`	|	Fri Aug 12 2022	|
|	[OOUI](https://icon-sets.iconify.design/ooui) | `@iconify-prerendered/vue-ooui`	|	Wed Aug 17 2022	|
|	[Open Iconic](https://icon-sets.iconify.design/oi) | `@iconify-prerendered/vue-oi`	|	Sat Jun 25 2022	|
|	[OpenMoji](https://icon-sets.iconify.design/openmoji) | `@iconify-prerendered/vue-openmoji`	|	Tue Jul 26 2022	|
|	[Pepicons](https://icon-sets.iconify.design/pepicons) | `@iconify-prerendered/vue-pepicons`	|	Sat Jul 02 2022	|
|	[Phosphor](https://icon-sets.iconify.design/ph) | `@iconify-prerendered/vue-ph`	|	Sat Jun 25 2022	|
|	[Pixelarticons](https://icon-sets.iconify.design/pixelarticons) | `@iconify-prerendered/vue-pixelarticons`	|	Sat Jun 25 2022	|
|	[PrestaShop Icons](https://icon-sets.iconify.design/ps) | `@iconify-prerendered/vue-ps`	|	Sat Jun 25 2022	|
|	[Prime Icons](https://icon-sets.iconify.design/prime) | `@iconify-prerendered/vue-prime`	|	Sat Jun 25 2022	|
|	[Quill Icons](https://icon-sets.iconify.design/quill) | `@iconify-prerendered/vue-quill`	|	Sat Jun 25 2022	|
|	[Radix Icons](https://icon-sets.iconify.design/radix-icons) | `@iconify-prerendered/vue-radix-icons`	|	Sat Jun 25 2022	|
|	[Raphael](https://icon-sets.iconify.design/raphael) | `@iconify-prerendered/vue-raphael`	|	Sat Jun 25 2022	|
|	[Remix Icon](https://icon-sets.iconify.design/ri) | `@iconify-prerendered/vue-ri`	|	Sat Jun 25 2022	|
|	[Simple Icons](https://icon-sets.iconify.design/simple-icons) | `@iconify-prerendered/vue-simple-icons`	|	Mon Aug 15 2022	|
|	[Simple line icons](https://icon-sets.iconify.design/simple-line-icons) | `@iconify-prerendered/vue-simple-line-icons`	|	Sat Jun 25 2022	|
|	[SmartIcons Glyph](https://icon-sets.iconify.design/si-glyph) | `@iconify-prerendered/vue-si-glyph`	|	Sun Jun 26 2022	|
|	[Subway Icon Set](https://icon-sets.iconify.design/subway) | `@iconify-prerendered/vue-subway`	|	Sat Jun 25 2022	|
|	[SVG Logos](https://icon-sets.iconify.design/logos) | `@iconify-prerendered/vue-logos`	|	Mon Aug 01 2022	|
|	[System UIcons](https://icon-sets.iconify.design/system-uicons) | `@iconify-prerendered/vue-system-uicons`	|	Sat Jun 25 2022	|
|	[Tabler Icons](https://icon-sets.iconify.design/tabler) | `@iconify-prerendered/vue-tabler`	|	Wed Aug 17 2022	|
|	[Teenyicons](https://icon-sets.iconify.design/teenyicons) | `@iconify-prerendered/vue-teenyicons`	|	Sun Jun 26 2022	|
|	[TopCoat Icons](https://icon-sets.iconify.design/topcoat) | `@iconify-prerendered/vue-topcoat`	|	Sat Jun 25 2022	|
|	[Twitter Emoji](https://icon-sets.iconify.design/twemoji) | `@iconify-prerendered/vue-twemoji`	|	Sat Jun 25 2022	|
|	[Typicons](https://icon-sets.iconify.design/typcn) | `@iconify-prerendered/vue-typcn`	|	Sat Jun 25 2022	|
|	[uiw icons](https://icon-sets.iconify.design/uiw) | `@iconify-prerendered/vue-uiw`	|	Sat Jun 25 2022	|
|	[Unicons](https://icon-sets.iconify.design/uil) | `@iconify-prerendered/vue-uil`	|	Sat Jun 25 2022	|
|	[Unicons Monochrome](https://icon-sets.iconify.design/uim) | `@iconify-prerendered/vue-uim`	|	Sat Jun 25 2022	|
|	[Unicons Solid](https://icon-sets.iconify.design/uis) | `@iconify-prerendered/vue-uis`	|	Sat Jun 25 2022	|
|	[Unicons Thin Line](https://icon-sets.iconify.design/uit) | `@iconify-prerendered/vue-uit`	|	Sat Jun 25 2022	|
|	[Vaadin Icons](https://icon-sets.iconify.design/vaadin) | `@iconify-prerendered/vue-vaadin`	|	Sat Jun 25 2022	|
|	[Vesper Icons](https://icon-sets.iconify.design/vs) | `@iconify-prerendered/vue-vs`	|	Sat Jun 25 2022	|
|	[VSCode Icons](https://icon-sets.iconify.design/vscode-icons) | `@iconify-prerendered/vue-vscode-icons`	|	Mon Aug 08 2022	|
|	[Weather Icons](https://icon-sets.iconify.design/wi) | `@iconify-prerendered/vue-wi`	|	Sat Jun 25 2022	|
|	[Web Symbols Liga](https://icon-sets.iconify.design/websymbol) | `@iconify-prerendered/vue-websymbol`	|	Sat Jun 25 2022	|
|	[WebHostingHub Glyphs](https://icon-sets.iconify.design/whh) | `@iconify-prerendered/vue-whh`	|	Sat Jun 25 2022	|
|	[Zondicons](https://icon-sets.iconify.design/zondicons) | `@iconify-prerendered/vue-zondicons`	|	Sat Jun 25 2022	|

<!-- PACKAGE LIST END -->

## License
The code for generating the icon sets is distributed under the MIT license. The icon sets themselves are distributed under the license of their author.
