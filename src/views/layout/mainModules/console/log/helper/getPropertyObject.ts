import {isPlainObject, isUndef} from "@/utils";

/**
 * @description 拿到纯对象所有可枚举和不可枚举的属性
 * @param obj 纯对象
 */
export function getPropertyObject(obj: any) {
  if (!isPlainObject(obj)) {
    throw new TypeError("Argument one require a plain object");
  }

  let enumerableNames = Object.keys(obj);
  let symbolNames = Object.getOwnPropertySymbols(obj);
  let propertyNames = Object.getOwnPropertyNames(obj);
  let enumerableProperty = [];
  let unEnumerableProperty = [];

  // 首先拿到所有可枚举和symbol属性
  for (let item of enumerableNames) {
    enumerableProperty.push({
      key: item,
      value: obj[item]
    });
  }

  for (let item of symbolNames) {
    enumerableProperty.push({
      key: item,
      value: obj[item]
    });
  }

  for (let item of propertyNames) {
    let property = obj[item];

    if (isUndef(property)) {
      unEnumerableProperty.push({
        key: item,
        value: obj[item]
      });
    }
  }

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
