import {getType, isArray, isBoolean, isFunc, isNumber, isPlainObject, isString, isSymbol, isUndef} from "@/utils";
import {getString} from "@/utils/shared/toString";

/**
 * @description 拿到显示目标在控制台中的数据具体内容
 * @param tar 目标属性值
 * 检测类型由特殊到一般
 */
export function getTargetType(tar: any) {
  if (isUndef(tar) || isNumber(tar) || isBoolean(tar) || isSymbol(tar) || isString(tar)) {
    return getString(tar);
  } else if (isArray(tar)) {
    return `Array(${tar.length})`
  } else if (isFunc(tar)) {
    // 函数类型
    return tar.name + getFuncArguments(tar);
  } else if (isPlainObject(tar)) {
    // 使用function构造函数或者直接声明的对象
    return getType(tar) + Object.getOwnPropertyNames(tar).length === 0 ? '{}' : '{...}';
  } else {
    // 说明已经是内置类型
    return `${getType(tar)}{}`;
  }
}

function getFuncArguments(fn: Function): string {
  // @ts-ignore
  return /(\([^)]*\))/.exec(fn.toLocalString())[0];
}
