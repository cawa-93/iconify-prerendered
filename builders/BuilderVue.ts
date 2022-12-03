import {BuilderBase} from "./BuilderBase.ts";
import {PackageJson} from "../utils/pkg-type.ts";

export class BuilderVue extends BuilderBase {
    get packageJsonObject(): PackageJson {
        const pkg = super.packageJsonObject;

        // peerDependencies
        if (!pkg.peerDependencies) {
            pkg.peerDependencies = {}
        }

        pkg.peerDependencies.vue = '>=3.0.0'


        // keywords
        if (!Array.isArray(pkg.keywords)) {
            pkg.keywords = []
        }
        pkg.keywords.push('vue')

        // patch description
        if (pkg.description) {
            pkg.description = pkg.description.replaceAll('components', 'Vue components')
        }

        return pkg
    }
}
