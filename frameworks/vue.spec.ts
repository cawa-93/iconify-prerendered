import esmock from "esmock";
import * as path from "node:path";
import VueBuilder from './vue.js'
import {testComponentNames, validateCollections} from "../builder/tests.js";


testComponentNames(VueBuilder)


await validateCollections<() => any[]>({
  builder: VueBuilder,
  importCollection(prefix) {
    return esmock(path.resolve(VueBuilder.output, prefix, 'index.js'), {
      vue: {h: (...args) => args}
    }, {}, {
      isModuleNotFoundError: false
    });
  },
  testComponent({component, svg, assert}) {
    const [el, props] = component()

    // should be rendered as <svg>
    assert.equal(el, 'svg')

    // props should exist
    assert.exists(props)

    // should have correct icon-body
    assert.equal(props.innerHTML, svg.body)

    // should have correct a11y attributes
    assert.isTrue(props['aria-hidden'])
    assert.equal(props['role'], 'img')

    // should have correct icon attributes
    for (const attributesKey in svg.attributes) {
      assert.equal(props[attributesKey], svg.attributes[attributesKey])
    }
  }
});
