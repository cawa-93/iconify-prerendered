import { test } from '@japa/runner'
import {getComponentName} from "../getComponentName.js";


test('validate component name - "{icon}"')
  .with([
    {icon: 'foo', component: 'IconFoo'},
    {icon: '-foo', component: 'IconFoo'},
    {icon: 'foo-', component: 'IconFooMinus'},
    {icon: 'foo-123', component: 'IconFoo123'},
    {icon: 'foo-1-2-3', component: 'IconFoo123'},
  ])

  // @ts-ignore
  .run(({ assert }, {icon, component}) => {
    assert.equal(getComponentName(icon), component)
  })

