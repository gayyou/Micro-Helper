const toString = Object.prototype.toString;

const getType = (tar: string) => toString.call(tar).slice(8, -1);

export const isUndef = (tar: any) => typeof tar === 'undefined' || tar === null;

export const isDef = (tar: any) => !isUndef(tar);

export const noop = () => {};

export const isArray = (tar: any) => Array.isArray(tar);

export const isPlainObject = (tar: any) => getType(tar) === 'Object';

export const isFunc = (tar: any) => getType(tar) === 'Function';

export const isString = (tar: any) => getType(tar) === 'String';
