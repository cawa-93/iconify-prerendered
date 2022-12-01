import {test} from "@japa/runner";
import {lookupCollection, lookupCollections} from "@iconify/json";
import {iconToSVG, parseIconSet, validateIconSet} from "@iconify/utils";
import {getComponentName} from "../builder/getComponentName.js";
import path from "node:path";
import {DIST_ROOT} from "../builder/get-package-dist.js";
import esmock from "esmock";


function getCollectionFile(prefix, file) {
  return path.resolve(DIST_ROOT, 'vue-' + prefix, file);
}

function importIconSet(prefix) {
  return esmock(getCollectionFile(prefix, 'index.js'), {
    vue: {h: (...args) => args}
  }, {}, {
    isModuleNotFoundError: false
  });
}


for (const prefix in await lookupCollections()) {
  const set = await importIconSet(prefix)
  const collection = await lookupCollection(prefix)

  test.group(`[vue-${collection.prefix}]`, () => {
    validateIconSet(collection)
    parseIconSet(collection, (name, data) => {

      const componentName = getComponentName(name)
      const component = set[componentName]

      const isIconHidden = !data || data.hidden

      test(`[vue-${collection.prefix}] ${componentName} component should${isIconHidden ? ' NOT ' : ' '}be exported`, ({assert}) => {
        assert[isIconHidden ? 'notExists' : 'exists'](component)
      })

      /**
       * No reason for testing hidden icons since they never should be rendered
       */
      if (isIconHidden) {
        return
      }


      /**
       * @param {import('@japa/assert').Assert} assert
       * @param {IconifyIconBuildResult} svg
       * @param {Record<string, any>} userAttributes
       */
      const validateComponent = (assert, svg, userAttributes = {}) => {
        const [el, props] = component(userAttributes)

        // Validate root <svg> element
        assert.equal(el, 'svg', 'expect rendered as <svg>')
        const allExpectedAttributes = {
          ...svg.attributes,
          ...userAttributes, // User attributes should rewrite defaults
        }

        for (const attribute in allExpectedAttributes) {
          assert.equal(props[attribute], allExpectedAttributes[attribute], `expect correct ${attribute} attribute`)
        }

        // Validate <svg> body
        assert.equal(props.innerHTML, svg.body, 'expect correct svg body')
      }

      test(`[vue-${collection.prefix}] ${componentName} should render correctly without user props`, ({assert}) => {
        validateComponent(assert, iconToSVG(data))
      })

      test(`[vue-${collection.prefix}] ${componentName} should render correctly with user props`, ({assert}) => {
        const userAttributes = {
          // Redefine default svg attribute
          'aria-hidden': false,
          // Test `class` as special case
          class: 'foo',
          // Test `style` as special case
          style: 'color: red',
          // Test random string
          [String(Date.now())]: Date.now(),
        }
        validateComponent(assert, iconToSVG(data), userAttributes)
      })
    })
  })
}
