import {lookupCollection, lookupCollections} from "@iconify/json";
import {getIconData, iconToSVG} from "@iconify/utils";
import {test} from "@japa/runner";
import esmock from "esmock";
import {getComponentName} from "../builder/getComponentName.js";
import * as path from "node:path";
import {DIST_ROOT} from "../builder/get-package-dist.js";

const collections = Object.keys(await lookupCollections())


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

for (const collectionPrefix of collections) {
  const set = await importIconSet(collectionPrefix)

  test.group(`validate vue components ${collectionPrefix}`, () => {
    test(`validate icon ${collectionPrefix}/{name}`)
      .with(async () => {
        const collection = await lookupCollection(collectionPrefix)
        let iconsToRender = Array.from(Object.keys(collection.icons))

        if (collection.aliases) {
          iconsToRender = iconsToRender.concat(Object.keys(collection.aliases))
        }

        return iconsToRender.reduce((icons, name) => {
          const data = getIconData(collection, name)
          if (!data.hidden) {
            icons.push({
              name,
              svg: iconToSVG(data)
            })
          }
          return icons
        }, [])
      })
      .run(({assert}, {name, svg}) => {
        const component = set[getComponentName(name)]

        // Component should be defined
        assert.notEqual(component, undefined)

        // should have correct default a11y attributes
        const [, defaultProps] = component()
        assert.equal(defaultProps['aria-hidden'], true)
        assert.equal(defaultProps['role'], 'img')


        const userAttributes = {
          'aria-hidden': false,
          'data-foo': 'foo',
          'name': 'name',
          'aria-label': 'aria-label'
        }

        const [el, props] = component(userAttributes)

        // should be rendered as <svg>
        assert.equal(el, 'svg')

        // should have correct icon-body
        assert.equal(props.innerHTML, svg.body)

        // should have correct icon attributes
        const allExpectedAttributes = {
          ...svg.attributes,
          ...userAttributes,
        }

        for (const attribute in allExpectedAttributes) {
          assert.equal(props[attribute], allExpectedAttributes[attribute], `${attribute} check`)
        }
      })
  })
}
