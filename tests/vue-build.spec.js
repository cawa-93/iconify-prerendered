import {lookupCollection, lookupCollections} from "@iconify/json";
import {getIconData, iconToSVG} from "@iconify/utils";
import {test} from "@japa/runner";
import esmock from "esmock";
import {getComponentName} from "../builder/getComponentName.js";
import * as fs from "node:fs";
import * as path from "node:path";

const collections = Object.keys(await lookupCollections())


function getCollectionFile(prefix, file) {
  return path.resolve('dist', prefix, file);
}

function importIconSet(prefix) {
  return esmock(getCollectionFile(prefix, 'index.js'), {
    vue: {h: (...args) => args}
  }, {}, {
    isModuleNotFoundError: false
  });
}

function isFileExist(filepath) {
  return fs.promises.access(filepath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

function isFileEmpty(filepath) {
  return fs.promises.readFile(filepath, {encoding: 'utf8'})
    .then((content) => content.trim().length === 0)
}

function isValidJsonFile(filepath) {
  return fs.promises.readFile(filepath, {encoding: 'utf8'})
    .then(JSON.parse)
    .then(() => true)
    .catch(() => false)
}

for (const collectionPrefix of collections) {
  const set = await importIconSet(collectionPrefix)

  test.group(`validate collection ${collectionPrefix}`, () => {
    test('should have {$self}')
      .with(['README.md', 'package.json'])
      .run(async ({assert}, file) => {
        const filePath = getCollectionFile(collectionPrefix, file)

        assert.equal(await isFileExist(filePath), true, 'File exist check')
        assert.equal(await isFileEmpty(filePath), false, 'File not empty check')

        if (filePath.endsWith('json')) {
          assert.equal(await isValidJsonFile(filePath), true, 'JSON validation')
        }
      })

    test(`validate ${collectionPrefix}/{name}`)
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
