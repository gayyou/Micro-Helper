import "./Network.scss";
import React from "react";
import { XhrHandler } from "./handlers";
import Emitter from "@/utils/event/Emitter";
import RequestContainer from "./components/RequestContainer";
import { test1, test2 } from "./mock";
import Drawer from '@/components/Drawer';

// todos:
// 只能拦截基于xhr、fetch的ajax请求，jsonp无法实现
// xhr修改原型上的open和send，劫持完再改回原来的方法

// network全局eventbus
export const networkEmitter: Emitter = new Emitter();

export interface requestData {
  name: string;
  status: string;
  size: string;
  time: string;
  url: string;
}
interface stateType {
  requests: Array<requestData>,
  visiable: true
}

/**
 * @author Jaycole
 * @description a network panel shows something about ajax  
 */
export default class Network extends React.Component {
  state: stateType
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      requests: [],
      visiable: true
    };
  }
  init() {
    this.proxyXhr();
  }
  proxyXhr() {
    if (!window.XMLHttpRequest) return; // 判断是否存在XMLHttpRequest对象

    // 获取原型对象，缓存原生方法
    const xhrProto = window.XMLHttpRequest.prototype;
    const origOpen = xhrProto.open;
    const origSend = xhrProto.send;
    const origSetRequestHeader = xhrProto.setRequestHeader;
    // const origSetRequestHeader = xhrProto.setRequestHeader;

    xhrProto.open = function (...arg) {
      // this is an instance of XMLHttpRequest
      const req: any = this;
      const [method, url] = arg;
      // get handle instance
      req.handler = new XhrHandler(req, method, url);

      // watch readystate
      req.addEventListener("readystatechange", () => {
        switch (req.readyState) {
          case 2: {
            // 2：HEADERS_RECEIVED
            return req.handler.handleResponseHeaders();
          }
          case 4: {
            // 4: DONE
            return req.handler.handleDone();
          }
        }
      });

      // call origin method
      origOpen.apply(this, arg);
    };
    // // proxy send
    xhrProto.send = function (data) {
      this.handler.handleSend(data);
      origSend.apply(this, data);
    };
    // proxy setRequestHeader
    xhrProto.setRequestHeader = function (key, val) {
      this.handler.handleRequestHeader(key, val);
      origSetRequestHeader.apply(this, arguments);
    };

    // watch send、update events
    networkEmitter.on("send", data => this.addReqRecord(data));
    networkEmitter.on("update", () => this.updateReqRecord());
  }
  updateReqRecord() {}
  /**
   * add a new request record to network panel
   * @param initData
   */
  addReqRecord(initData) {
    // setState使用函数避免操作合并
    this.setState((state: stateType) => ({
      requests: [...state.requests, initData]
    }))
  }
  resetXhr() {

  }
  componentWillUnmount() {
    // Emitter.off('send')
  }
  clearRequestData(): void {
    this.setState({
      requests: [],
    });
  }
  componentDidMount() {
    test1();
    test2();
  }
  handleClose = () => {
    this.setState({
      visiable: false
    })
  }
  handleOpen = data => {
    // open drawer and set drawer body
    this.setState({
      visiable: true
    })
  }
  renderDetail() {
    return (
      <></>
    )
  }
  render() {
    return (
      <div className="network-container">
         <Drawer
          visiable={this.state.visiable}
          onClose={this.handleClose}
         >
          {this.renderDetail()}
         </Drawer>
            <RequestContainer 
              data={this.state.requests} 
              openMask={this.handleOpen} 
            />
        <footer className="network-footer">
          <button
            className="network-clear-button"
            onClick={() => this.clearRequestData}
          >
            clear
          </button>
        </footer>
      </div>
    );
  }
}
