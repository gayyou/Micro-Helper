import {isArray, isFunc, isPlainObject} from "@/utils";

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
  }

  return tar.toString();
}
