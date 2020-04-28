import {isArray, isFunc, isMap, isSet, isString, isSymbol} from "@/utils";
import {
  arrayOptions,
  baseOptions, funcOptions,
  mapAndSetOptions, stringOptions
} from "@views/layout/mainModules/console/log/helper/propertyOptions";
import {isBaseDataType} from "@views/layout/mainModules/console/log/helper/getTargetType";

interface PropertyItem {
  key: any;
  value: any;
}

/**
 * @description 拿到基础的、并且不可枚举的属性，比如数组的length、对象的__proto__
 * @param obj
 */
function getBaseProperty(obj: any): PropertyItem[] {
  let resultProperty: PropertyItem[] = [];
  let typeOptions = [];

  // 由特殊到一般
  if (isArray(obj)) {
    typeOptions = arrayOptions;
  } else if (isMap(obj) || isSet(obj)) {
    typeOptions = mapAndSetOptions;
  } else if (isFunc(obj)) {
    typeOptions = funcOptions;
  } else if (isString(obj)) {
    typeOptions = stringOptions;
  }

  for (let item of typeOptions) {
    resultProperty.push(getPropertyItemWithErrorCatch(obj, item));
  }

  // 每个属性都有基础的属性选项
  for (let item of baseOptions) {
    resultProperty.push(getPropertyItemWithErrorCatch(obj, item));
  }

  return resultProperty;
}

/**
 * @description 拿到纯对象所有可枚举和不可枚举的属性
 * @param obj 纯对象
 */
export function getPropertyObject(obj: any) {
  if (isBaseDataType(obj)) {
    return {
      enumerableProperty: [],
      unEnumerableProperty: []
    }
  }

  let propertyDescriptors = Object.getOwnPropertyDescriptors(obj);
  let keys = Reflect.ownKeys(propertyDescriptors);
  let enumerableProperty: PropertyItem[] = [];
  let unEnumerableProperty: PropertyItem[] = [];

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    // @ts-ignore
    if (propertyDescriptors[key].enumerable) {
      enumerableProperty.push(getPropertyItemWithErrorCatch(obj, key));
    } else {
      unEnumerableProperty.push(getPropertyItemWithErrorCatch(obj, key));
    }
  }

  unEnumerableProperty = [...unEnumerableProperty, ...getBaseProperty(obj)];

  return {
    enumerableProperty,
    unEnumerableProperty
  };
}

/**
 * @description 拿到dom节点的所有属性
 * @param dom
 */
export function getDomAttribute(dom: HTMLElement) {
  let attributes = {};
  let attributeNames = dom.getAttributeNames();

  for (let item of attributeNames) {
    attributes[item] = dom.getAttribute(item);
  }

  return attributes;
}

function getPropertyItemWithErrorCatch(obj: any, key: any): PropertyItem {
  let value;

  try {
    value = obj[key];
  } catch (e) {
    value = e.toString();
  }

  key = isSymbol(key) ? key.toString() : key;

  return {
    key,
    value
  }
}
