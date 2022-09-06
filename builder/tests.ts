import type {Builder} from "./builder.js";
import {test} from "@japa/runner";
import {IconifyIconBuildResult} from "@iconify/utils/lib/svg/build";
import {Assert} from "@japa/assert";
import * as path from "node:path";
import {isFileEmpty, isFileExist, isValidJsonFile} from "./utils.js";
import {getIconData, iconToSVG} from "@iconify/utils";

export function testComponentNames(builder: Builder) {
  test('validate component name - "{icon}"')
    .with([
      {icon: 'foo', component: 'IconFoo'},
      {icon: '-foo', component: 'IconFoo'},
      {icon: 'foo-', component: 'IconFooMinus'},
      {icon: 'foo-123', component: 'IconFoo123'},
      {icon: 'foo-1-2-3', component: 'IconFoo123'},
    ])

    // @ts-ignore
    .run(({assert}, {icon, component}) => {
      assert.equal(builder.getComponentName(icon), component)
    })
}

interface ValidateCollectionOptions<TComponent> {
  builder: Builder,
  importCollection: <T extends any = any>(collectionName: string) => Promise<Record<string, TComponent>>,
  testComponent: ({component, svg}: { component: TComponent, svg: IconifyIconBuildResult, assert: Assert }) => void
}

export async function validateCollections<TComponent>(
  {builder, importCollection, testComponent}:
    ValidateCollectionOptions<TComponent>
) {

  function getCollectionFile(prefix, file) {
    return path.resolve(builder.output, prefix, file);
  }


  for (const collectionPrefix of await builder.lookupCollections()) {
    const set = await importCollection(collectionPrefix)

    test.group(`validate collection ${collectionPrefix}`, () => {
      test('should have {$self}')
        .with(['README.md', 'package.json'])

        // @ts-ignore
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
          const collection = await builder.lookupCollection(collectionPrefix)
          let iconsToRender = builder.lookupIconsInCollection(collection)

          return iconsToRender.map(name => {
            const data = getIconData(collection, name, true)
            return ({name, svg: iconToSVG(data, data as any)});
          })
        })

        // @ts-ignore
        .run(({assert}, {name, svg}) => {
          const component = set[builder.getComponentName(name)]

          // Component should be defined
          assert.exists(component)

          testComponent({component, svg, assert})
        })

    })

  }
}
