import {assertEquals, assertExists, assertNotEquals} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {ExtendedIconifyIcon, iconToSVG, lookupCollection, lookupCollections, parseIconSet} from "../npm-deps.ts";
import {PackageJson} from "../utils/pkg-type.ts";
import {BuilderVue} from "./BuilderVue.ts";

for (const prefix in await lookupCollections()) {
    const pkgName = `vue-${prefix}`
    const resolveInPkg = (f: string) => import.meta.resolve(`../dist/${pkgName}/${f}`)

    Deno.test(pkgName, async (t) => {

        // package.json
        await t.step('should have valid package.json', async () => {
            const content = (await Deno.readTextFile(new URL(resolveInPkg('package.json')))).trim()
            assertNotEquals(content, '', 'package.json empty')

            const pkg: PackageJson = JSON.parse(content)
            assertExists(pkg.name)
            assertEquals(pkg.name.startsWith('@iconify-prerendered/'), true, 'Package name should start with @iconify-prerendered/')
            assertExists(pkg.version)
        })

        // README.md
        await t.step('should have non-empty README.md', async () => {
            const content = (await Deno.readTextFile(new URL(resolveInPkg('README.md')))).trim()
            assertNotEquals(content, '', 'README.md empty')
        })

        await t.step('should have correct implementation', async (t) => {
            const pkg = await import(resolveInPkg('index.js'))
            const collection = await lookupCollection(prefix)

            await t.step('should export only visible icons', () => {
                parseIconSet(collection, (iconName, iconData) => {
                    const isIconHidden = !iconData || iconData.hidden
                    const componentName = BuilderVue.getComponentName(iconName)
                    assertEquals(pkg[componentName] === undefined, !!isIconHidden, `${componentName} should ${isIconHidden ? 'not ' : ''}be exported`)
                })
            })

            await t.step('should render correctly', () => {
                parseIconSet(collection, (iconName, iconData) => {
                    const isIconHidden = !iconData || iconData.hidden
                    if (isIconHidden) {
                        return
                    }

                    const componentName = BuilderVue.getComponentName(iconName)
                    const component = pkg[componentName]
                    assertComponent(component, iconData);
                    assertComponent(component, iconData, {
                        // Redefine default svg attribute
                        'aria-hidden': false,
                        // Test `class` as special case
                        class: 'foo',
                        // Test `style` as special case
                        style: 'color: red',
                        // Test random string
                        [String(Date.now())]: Date.now(),
                    });
                })

                function assertComponent(component: any, iconData: ExtendedIconifyIcon, userAttrs: Record<string, string | number | boolean> | undefined = undefined) {
                    const [tag, attrs] = component(userAttrs)

                    assertEquals(tag, 'svg')

                    const svg = iconToSVG(iconData)
                    const expectedAttrs = {
                        ...svg.attributes,
                        "aria-hidden": true,
                        role: "img",
                        ...(userAttrs || {}),
                        innerHTML: svg.body,
                    }
                    assertEquals(attrs, expectedAttrs)
                }
            })
        })
    });
}
