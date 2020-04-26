import {isPlainObject} from "@/utils";
import {getPropertyObject} from "@views/layout/mainModules/console/log/helper/getPropertyObject";
import {
  EnumerablePropertyItem,
  UnEnumerablePropertyItem
} from "@views/layout/mainModules/console/log/propertyItem/PropertyItem";
import React from "react";

/**
 * @description 拿到组件列表，拿到后直接渲染
 * @param data
 * @param indent
 */
export function getPropertyComponentList(data: any, indent: number): {
  enumerableList: Array<any>;
  unEnumerableList: Array<any>;
} {
  if (!isPlainObject(data)) {
    return ;
  }

  let {unEnumerableProperty, enumerableProperty} = getPropertyObject(data);
  let enumerableList, unEnumerableList;

  // 将可以枚举的属性拿在一起，采用一种样式
  enumerableList = enumerableProperty.map((item) => (
    <EnumerablePropertyItem
      indent={indent}
      target={item}
      key={item.key}
    />
  ));

  unEnumerableList = unEnumerableProperty.map((item) => (
    <UnEnumerablePropertyItem
      indent={indent}
      target={item}
      key={item.key}
    />
  ));

  return {
    enumerableList,
    unEnumerableList
  }
}
