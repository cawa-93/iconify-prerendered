import {lookupCollection, lookupCollections} from "@iconify/json";
import {getIconData, iconToSVG} from "@iconify/utils";
import {test} from "@japa/runner";
import esmock from "esmock";
import {getComponentName} from "../getComponentName.js";

const collections = Object.keys(await lookupCollections())

for (const collectionPrefix of collections) {
  const set = await esmock(`../dist/${collectionPrefix}/index.js`, {}, {
    vue: {
      h: (...args) => args
    }
  })
  test.group(`validate collection ${collectionPrefix}`, async (group) => {
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
        assert.notEqual(component, undefined)
        const renderArgs = component.setup()()
        assert.equal(renderArgs[0], 'svg')
        assert.equal(renderArgs[1].innerHTML, svg.body)
        for (const attributesKey in svg.attributes) {
          assert.equal(renderArgs[1][attributesKey], svg.attributes[attributesKey])
        }
      })

  })

}
