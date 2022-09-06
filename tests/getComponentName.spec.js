import { test } from '@japa/runner'
import {getComponentName} from "../getComponentName.ts";


test('validate component name - "{icon}"')
  .with([
    {icon: 'foo', component: 'IconFoo'},
    {icon: '-foo', component: 'IconFoo'},
    {icon: 'foo-', component: 'IconFooMinus'},
    {icon: 'foo-123', component: 'IconFoo123'},
    {icon: 'foo-1-2-3', component: 'IconFoo123'},
  ])
  .run(({ assert }, {icon, component}) => {
    assert.equal(getComponentName(icon), component)
  })

