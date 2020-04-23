import React from "react";
import {Lifecycle} from "./lifecycle";
import {isArray, isUndef} from "../../utils";
import {warn} from "@/utils/log";
import {LRU} from "@/utils/lru/LRU";
import {keepAliveEvent} from "./KeepAlive";

function getFirstComponent(children: any[] | any): {
  key: string;
  child: any;
} | void | null {
  if (isUndef(children) || children.length === 0) {
    return null;
  }
  let key;
  let component = null;

  if (isArray(children)) {
    key = children[0].key;
    component = children[0];
  } else {
    key = children.key;
    component = children;
  }

  if (isUndef(key)) {
    // 如果没有定义key的话，那么报错1
    return warn(`KeepAlive inner component must have key`);
  }

  return {
    key,
    child: component
  };
}

/**
 * @description
 */
export default class Keeper extends React.Component {
  devRenderLock: boolean = false;

  props: {
    id: string;
    containerEl: HTMLElement;
    children?: any;
  };

  state: {
    id: string;
    cache: LRU<any>;
    nodes: Map<string, HTMLElement>;
  };

  preActiveKey: string;
  curActiveKey: string;

  constructor(props: any) {
    super(props);
    this.state = {
      id: props.id,
      cache: new LRU(),
      nodes: new Map(),
    };
    this.preActiveKey = null;
    this.curActiveKey = null;

    this.init(props);
  }

  // TODO 我现在处理的是组件渲染后外面的一层div，到时候需要拿到内容

  [Lifecycle.UN_ACTIVE] = (key: string) => {
    // 将keeper所持有的nodes从显示区域去除
    let preNodes = this.state.nodes.get(key);
    let childrenNodes = this.props.containerEl.childNodes;
    for (let i = 0; i < childrenNodes.length; i++) {
      preNodes.appendChild(childrenNodes[i]);
    }
    // if (isDef(nodes.get(key))) {
    //   this.props.containerEl.removeChild(nodes.get(key));
    // }
  };

  [Lifecycle.ACTIVE] = (key: string) => {
    // 将keeper所持有的nodes增加至显示区域
    let { nodes } = this.state;
    let childrenNodes = nodes.get(key).childNodes;

    for (let i = 0; i < childrenNodes.length; i++) {
      this.props.containerEl.appendChild(childrenNodes[i]);
    }
  };

  /**
   * @description 进行缓存组件
   * @param children
   */
  cacheReactComponent = (children: any[]) => {
    if (isUndef(children) || children.length === 0) {
      return ;
    }

    let item = getFirstComponent(children);

    if (isUndef(item)) {
      return ;
    }

    // @ts-ignore
    this.state.cache.set(item.key, item.child);
    if (!this.devRenderLock) {
      this.preActiveKey = this.curActiveKey;
      // @ts-ignore
      this.curActiveKey = item.key;
      this.devRenderLock = true;
    }

    if (this.preActiveKey !== null) {
      this.forceUpdate();
    }
  };

  /**
   * @description 初始化组件，进行订阅事件来控制显示的内容，由KeepAlive来控制
   * @param props
   */
  init = (props) => {
    keepAliveEvent.on(props.id, (data) => {
      this.cacheReactComponent(data.children);
    });

    // 进行缓存组件
    this.cacheReactComponent(props.children);
  };

  shouldComponentUpdate(): boolean {
    let {cache, nodes} = this.state;

    for (let item of cache) {
      if (!nodes.has(item[0])) {
        // 如果渲染后节点与cache不符合的话，会触发渲染，并且在渲染的时候重新构建nodes
        nodes.clear();
        return true;
      }
    }

    return false;
  }

  componentDidUpdate(): void {
    this.updateDOM();
  }

  updateDOM = () => {
    this.devRenderLock = false;
    this[Lifecycle.UN_ACTIVE](this.preActiveKey);
    this[Lifecycle.ACTIVE](this.curActiveKey);
  }

  componentDidMount(): void {
    this.updateDOM();
  }

  render() {
    // children的话，从cache里面拿
    let childrenNodes = Array.from(this.state.cache.entries());

    return (<div>
      {childrenNodes.map((item) => (
        <div
          key={item[0]}
          ref={(node) => {
            this.state.nodes.set(item[0], node);
          }}
        >
          {item[1]}
        </div>
      ))}
    </div>)
  }
}
