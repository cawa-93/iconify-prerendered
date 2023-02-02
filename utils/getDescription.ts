import {IconifyJSON} from "../npm-deps.ts";

export function getDescription(collection: Pick<IconifyJSON, "info" | "prefix">) {
    return `${
        collection.info?.name || collection.prefix
    } components. Designed for ease of use and high performance`;
}
