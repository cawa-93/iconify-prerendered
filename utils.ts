/**
 * @param {string} s
 * @returns {string}
 */
import {readFile, access} from "node:fs/promises";
import {constants} from "node:fs";

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isFileExist(filepath) {
    return access(filepath, constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

export function isFileEmpty(filepath) {
    return readFile(filepath, {encoding: 'utf8'})
        .then((content) => content.trim().length === 0)
}

export function isValidJsonFile(filepath) {
    return readFile(filepath, {encoding: 'utf8'})
        .then(JSON.parse)
        .then(() => true)
        .catch(() => false)
}
