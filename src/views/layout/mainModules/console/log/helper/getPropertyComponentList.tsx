import {getPropertyObject} from "@views/layout/mainModules/console/log/helper/getPropertyObject";
import {
  EnumerablePropertyItem,
  UnEnumerablePropertyItem
} from "@views/layout/mainModules/console/log/propertyItem/PropertyItem";
import React from "react";
import {isBaseDataType} from "@views/layout/mainModules/console/log/helper/getTargetType";

/**
 * @description 拿到组件列表，拿到后直接渲染
 * @param data
 * @param indent
 */
export function getPropertyComponentList(data: any, indent: number): {
  enumerableList: Array<any>;
  unEnumerableList: Array<any>;
} {
  if (isBaseDataType(data)) {
    return {
      enumerableList: [],
      unEnumerableList: []
    };
  }

  let {unEnumerableProperty, enumerableProperty} = getPropertyObject(data);

  let enumerableList, unEnumerableList;

  // 将可以枚举的属性拿在一起，采用一种样式
  enumerableList = enumerableProperty.map((item, index) => (
    <EnumerablePropertyItem
      indent={indent}
      target={item}
      key={index}
    />
  ));

  unEnumerableList = unEnumerableProperty.map((item, index) => (
    <UnEnumerablePropertyItem
      indent={indent}
      target={item}
      key={index}
    />
  ));

  return {
    enumerableList,
    unEnumerableList
  }
}
