let types = ['Map', 'Set', 'Date', 'RegExp', 'Error', 'Math', 'global'];
const objectTypeSet: Set<string> = new Set(types);

const toString = Object.prototype.toString;

export const getType = (tar: string) => toString.call(tar).slice(8, -1);

export const isUndef = (tar: any) => typeof tar === 'undefined' || tar === null;

export const isDef = (tar: any) => !isUndef(tar);

export const noop = () => {};

export const isArray = (tar: any) => Array.isArray(tar);

export const isPlainObject = (tar: any) => getType(tar) === 'Object';

export const isFunc = (tar: any) => getType(tar) === 'Function';

export const isSymbol = (tar: any) => getType(tar) === 'Symbol';

export const isString = (tar: any) => getType(tar) === 'String';

export const isBuildInObject = (tar: any) => isDef(objectTypeSet.has(getType(tar)));

export const isNumber = (tar: any) => getType(tar) === 'Number';

// eslint-disable-next-line no-self-compare
export const isNaN = (tar: any) => tar !== tar;

export const isBoolean = (tar: any) => getType(tar) === 'Boolean';
