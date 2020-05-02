import "./Network.scss";
import React from "react";
import { XhrHandler } from "./handlers";
import Emitter from "@/utils/event/Emitter";
import {RequestContainer, RequestDetail} from "./components";

import { test1, test2,  default as mock } from "./mock";
import Drawer from '@/components/Drawer';
import { NetworkStateType } from './Network';

// todos:
// 只能拦截基于xhr、fetch的ajax请求，jsonp无法实现
// xhr修改原型上的open和send，劫持完再改回原来的方法

// network全局eventbus
export const networkEmitter: Emitter = new Emitter();

/**
 * @author Jaycole
 * @description a network panel shows something about ajax  
 */
export default class Network extends React.Component {
  state: NetworkStateType
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      requests: [],
      visiable: true,
      id: ''
    };
  }
  componentDidMount() {
    for (let cb of mock) 
      cb();
    // watch open events
    networkEmitter.on('open', this.handleOpen);
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
          // 1：open
          case 1: {
            // record start time 
            let startTime = (+new Date())
            req.handler._xhrData.startTime = startTime;
            console.log()
          }
          case 2: {
            // 2：HEADERS_RECEIVED
            return req.handler.handleResponseHeaders();
          }
          case 4: {
            // 4: DONE
            let endTime = (+new Date())
            req.handler._xhrData.endTime = endTime;
            return req.handler.handleDone();
          }
        }
      });
      // call origin method
      try {
        origOpen.apply(this, arg);
      } catch (error) {
        throw error;
      }
    };
    // // proxy send
    xhrProto.send = function (data) {
      this.handler.handleSend(data);
      try {
        origSend.apply(this, data);
      } catch (error) {
        throw error;
      }
    };
    // proxy setRequestHeader
    xhrProto.setRequestHeader = function (key, val) {
      this.handler.handleRequestHeader(key, val);
      try {
        origSetRequestHeader.apply(this, arguments);
      } catch (error) {
        throw error;
      }
    };
    // watch send、update events
    networkEmitter.on("send", data => this.addReqRecord(data));
  }
  updateReqRecord() {}
  /**
   * add a new request record to network panel
   * @param initData
   */
  addReqRecord(initData) {
    // setState使用函数避免操作合并
    this.setState((state: NetworkStateType) => ({
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
  
  handleClose = () => {
    this.setState({
      visiable: false
    })
  }
  handleOpen = data => {
    console.log(data.id);
    // open drawer and set drawer body
    this.setState({
      visiable: true,
      id: data.id
    })
  }
  getReqData() {
    console.log()
    return this.state.requests.filter(request => request.id === this.state.id);
  }
  render() {
    return (
      <div className="network-container">
         <Drawer
          visiable={this.state.visiable}
          onClose={this.handleClose}
         >
          <RequestDetail 
            data={this.getReqData()}
          />
         </Drawer>
            <RequestContainer 
              data={this.state.requests} 
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
