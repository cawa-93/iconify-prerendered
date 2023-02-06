import * as baseline from './generated/baseline/vue-fluent-emoji/index.js'
import * as test from './generated/test/vue-fluent-emoji/index.js'
import type {SVGAttributes} from 'vue'

function renderAll(namespace: typeof baseline | typeof test, props?:SVGAttributes ) {
  for (const key of Object.keys(namespace)) {
    namespace[key as keyof typeof namespace](props)
  }
}

Deno.bench('MAIN', {baseline: true, group: 'without props'}, () => renderAll(baseline))
Deno.bench('WORKING COPY', {group: 'without props'}, () => renderAll(baseline))


const additionalProps = {
  role: 'none',
  style: 'color: red',
  class: 'foo',
  id: 'id',
  lang: 'asd',
} satisfies SVGAttributes

Deno.bench('MAIN', {baseline: true, group: 'with props'}, () => renderAll(baseline, additionalProps))
Deno.bench('WORKING COPY', {group: 'with props'}, () => renderAll(baseline, additionalProps))
