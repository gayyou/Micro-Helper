import React from "react";
import ReactDOM from "react-dom";
import Keeper from "./Keeper";
import Emitter from "@/utils/event/Emitter";

interface KeepAliveStatusData {
  type?: string;
  key?: string;
  children: any[];
}

const KEEP_ALIVE = "keep-alive-";
const offlineDOM: HTMLElement = document.createElement('div');
let uid = 1;
// TODO 使用一个事件系统来进行通信
export const keepAliveEvent: Emitter<KeepAliveStatusData> = new Emitter();

export default class KeepAlive extends React.Component{
  el: HTMLElement = null;
  id: string;

  constructor(props: any) {
    super(props);
    this.id = KEEP_ALIVE + uid++;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext: any): boolean {
    // 每次进行更新的时候，会触发事件，然后进行更新视图
    keepAliveEvent.emit(this.id, {
      children: nextProps.children
    });
    return false;
  }

  componentDidMount(): void {
    // 创建一个离线节点，然后以这个节点为由
    this.el.innerHTML = '';
    ReactDOM.render(<Keeper
      id={this.id}
      containerEl={this.el}
    >
      {this.props.children}
    </Keeper>, offlineDOM);
  }

  /**
   * @description 使用pureComponent组件，这样可以阻止很多时候的更新
   */
  render() {
    return <div
      ref={(el) => {
        this.el = el.parentElement;
      }
    }/>;
  }
}
