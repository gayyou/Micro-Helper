import {getType, isArray, isBoolean, isFunc, isNumber, isPlainObject, isString, isSymbol, isUndef} from "@/utils";
import {getString} from "@/utils/shared/toString";
import {getPropertyObject} from "@views/layout/mainModules/console/log/helper/getPropertyObject";

const objectMaxPropertyNumber: number = 4;

/**
 * @description 拿到显示目标在控制台中的数据具体内容
 * @param tar 目标属性值
 * 检测类型由特殊到一般
 * @param objShowMaxPropertyNumber 对象缩略图中最多显示的属性个数
 */
export function getTargetType(tar: any, objShowMaxPropertyNumber: number = objectMaxPropertyNumber) {
  if (isUndef(tar) || isNumber(tar) || isBoolean(tar) || isSymbol(tar) || isString(tar)) {
    return getString(tar);
  } else if (isArray(tar)) {
    return `Array(${tar.length})`
  } else if (isFunc(tar)) {
    // 函数类型
    return tar.name + getFuncArguments(tar);
  } else if (isPlainObject(tar)) {
    // 使用function构造函数或者直接声明的对象
    return getType(tar) + '  {' + getObjectPreloadString(tar, objShowMaxPropertyNumber) + '}';
  } else {
    // 说明已经是内置类型
    return `${getType(tar)}{}`;
  }
}

function getFuncArguments(fn: Function): string {
  // @ts-ignore
  return /(\([^)]*\))/.exec(fn.toLocalString())[0];
}

/**
 * @description 拿到对象属性的缩略图,只显示可枚举的属性
 * @param data 拿到的纯对象
 * @param preloadPropertyNumber 显示对象内部的属性的个数
 */
function getObjectPreloadString(data: Object, preloadPropertyNumber: number = -Infinity) {
  let {enumerableProperty} = getPropertyObject(data);

  if (preloadPropertyNumber <= 0 && enumerableProperty.length > 0) {
    return '...';
  }

  let resultString = '';
  let i;

  for (i = 0; i < preloadPropertyNumber && i < enumerableProperty.length; i++) {
    resultString += enumerableProperty[i].key + " :  " + getTargetType(enumerableProperty[i].value, -1) + ',';
  }

  if (i < enumerableProperty.length) {
    return resultString + '...';
  }

  return resultString.slice(0, -1);
}

const baseTypes = ['number', 'true', 'false', 'string', 'undefined', 'null', 'symbol'];

export function isBaseDataType(tar: any): boolean {
  return baseTypes.includes(getTargetType(tar).toLowerCase());
}

export function isReferenceType(tar: any): boolean {
  return !isBaseDataType(tar);
}
