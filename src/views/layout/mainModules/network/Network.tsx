import './Network.scss'
import React from "react";
import {XhrHandler} from './handlers';
import Emitter from "@/utils/event/Emitter"
import RequestContainer from "./components/RequestContainer";
import {test1} from './mock';

// todos:
// 只能拦截基于xhr、fetch的ajax请求，jsonp无法实现
// xhr修改原型上的open和send，劫持完再改回原来的方法

// network全局eventbus
export const networkEmitter: Emitter  = new Emitter();

export interface requestData {
  name: string,
  status: string,
  size: string,
  time: string,
  url: string
}
/**
 * @author Jaycole
 */
export default class Network extends React.Component {
  state: {
    requests: Array<requestData>;
  }
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      requests: [{
        name: 'abc',
        status: 'pending',
        size: '300kb',
        time: '200ms',
        url: 'http://localhost:8080'
      }]
    }
    this.clearRequestData = this.clearRequestData.bind(this);
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

    xhrProto.open = function(...arg) { 
      // this is an instance of XMLHttpRequest
      const req: any = this; 
      const [method, url] = arg;
      // get handle instance
      req.handler = new XhrHandler(req, method, url); 

      // watch readystate
      req.addEventListener('readystatechange', () => { 
        switch(req.readyState) {
          case 2: {
            // 2：HEADERS_RECEIVED
            return req.handler.handleResponseHeaders();
          }
          case 4: {
            // 4: DONE
            return req.handler.handleDone();
          }
        }
      })
      // 调用缓存的方法
      origOpen.apply(this, arg);
    }
    // // proxy send
    xhrProto.send = function(data) {
      this.handler.handleSend(data);
      origSend.apply(this, data);
    }
    // proxy setRequestHeader
    xhrProto.setRequestHeader = function(key, val) {
      this.handler.handleRequestHeader(key, val);
      origSetRequestHeader.apply(this, arguments);
    }
    // watch send、update events
    networkEmitter.on('send', data =>{this.addReqRecord(data)});
    networkEmitter.on('update', ()=>{this.updateReqRecord()});
  }
  updateReqRecord() {

  }
  /**
   * add a new request record to network panel
   * @param initData 
   */
  addReqRecord(initData) {
    console.log(initData)
    this.setState({
      requests: this.state.requests.push(initData)
    })
  }
  resetXhr() {

  }
  componentWillUnmount() {
    // Emitter.off('send')
  }
  clearRequestData(): void {
    this.setState({
      requests: []
    })
  }
  componentDidMount() {
    test1();
  }
  render() {
    return (
      <div className="network-container">
        <RequestContainer data = {this.state.requests} />
        <footer className="network-footer">
          <button className="network-clear-button" onClick={this.clearRequestData}>clear</button>
        </footer>
      </div>
    );
  }
}
