import React from "react";
import {LRU} from "../../utils/lru/LRU";
import {isArray, isFunc, isUndef} from "../../utils";

export default class KeepAlive extends React.PureComponent{
  state: {
    lru: LRU
  };

  constructor(props: any) {
    super(props);
    this.state = {
      lru: new LRU()
    };
  }

  /**
   * @description 利用LRU淘汰算法进行缓存，当超过容量的时候进行淘汰算法
   * @param children 当前渲染的时候传进来的组件
   */
  getCacheElement = (children: any[] | undefined) => {
    if (isUndef(children)) {
      return [];
    }

    if (!isArray(children)) {
      children = [children];
    }

    let result = [];
    let lru = this.state.lru;
    let len = children.length;

    for (let i = 0; i < len; i++) {
      let item = children[i];
      let { key, type } = item;

      if (!isFunc(type) || isUndef(key)) {
        continue;
      }

      if (lru.has(key)) {
        // 如果存在已经初始化的组件，那么进行获取该组件实例，进行渲染
        result.push(lru.get(key));
      } else {
        lru.set(key, item);
        result.push(item);
      }
    }

    return result;
  }

  componentWillUnmount(): void {
    this.state.lru.clear();
  }

  render() {
    // @ts-ignore
    let children = this.getCacheElement(this.props.children);
    return (
      <>
        {children}
      </>
    );
  }
}
