import {isArray, isFunc, isPlainObject, isString} from "@/utils";

/**
 * @description
 * @param tar
 */
export function getString(tar: any): string {
  if (isFunc(tar)) {
    return tar.toLocalString();
  } else if (isPlainObject(tar) || isArray(tar) || tar === null) {
    return JSON.stringify(tar);
  } else if (typeof tar === 'undefined') {
    return 'undefined';
  } else if (isString(tar)) {
    return `"${tar}"`;
  }

  return tar.toString();
}
