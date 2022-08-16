# @iconify-prerendered
A set of independent, generated view components for [iconify](https://iconify.design/) icons.

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)

## Instalation
Install the appropriate icon set
```
npm i @iconify-prerendered/vue-<icon-set-name>

# Bootstrap Icons
npm i @iconify-prerendered/vue-bi

# Material Design Icons
npm i @iconify-prerendered/vue-mdi
```
See [all available icon sets](https://icon-sets.iconify.design/)

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
Thats all you need.
