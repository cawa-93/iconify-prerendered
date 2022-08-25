import {lookupCollection, lookupCollections} from "@iconify/json";
import {getIconData, iconToSVG} from "@iconify/utils";
import {test} from "@japa/runner";
import esmock from "esmock";
import {getComponentName} from "../getComponentName.js";

const collections = Object.keys(await lookupCollections())


function importIconSet(prefix) {
  return esmock(`../dist/${prefix}/index.js`, {
    vue: {h: (...args) => args}
  }, {}, {
    isPackageNotFoundError: false
  });
}

for (const collectionPrefix of collections) {
  const set = await importIconSet(collectionPrefix)

  test.group(`validate collection ${collectionPrefix}`, () => {
    test(`validate ${collectionPrefix}/{name}`)
      .with(async () => {
        const collection = await lookupCollection(collectionPrefix)
        let iconsToRender = Array.from(Object.keys(collection.icons))

        if (collection.aliases) {
          iconsToRender = iconsToRender.concat(Object.keys(collection.aliases))
        }

        return iconsToRender.map(name => {
          const data = getIconData(collection, name, true)
          return ({name, data, svg: iconToSVG(data, data)});
        }).filter(({data}) => !data.hidden)
      })
      .run(({assert}, {name, svg}) => {
        const component = set[getComponentName(name)]

        // Component should be defined
        assert.notEqual(component, undefined)

        const [el, props] = component()

        // should be rendered as <svg>
        assert.equal(el, 'svg')

        // should have correct icon-body
        assert.equal(props.innerHTML, svg.body)

        // should have correct a11y attributes
        assert.equal(props['aria-hidden'], true)
        assert.equal(props['role'], 'img')

        // should have correct icon attributes
        for (const attributesKey in svg.attributes) {
          assert.equal(props[attributesKey], svg.attributes[attributesKey])
        }
      })

  })

}
