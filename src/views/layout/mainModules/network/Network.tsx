import './Network.scss'
import React from "react";
import {XhrHandler} from './handlers';
import Emitter from "@/utils/event/Emitter"
import RequestContainer from "./components/RequestContainer";

// todos:
// 请求有几种形式：xhr、fetch、jsonp
// 基于事件分发和重写xhr
// xhr修改原型上的open和send，劫持完再改回原来的方法

export const networkEmitter: Emitter  = new Emitter();


export interface requestData {
  Name: string,
  Status: string,
  Size: string,
  Time: string,
  Url: string
}


export default class Network extends React.Component {
  state: {
    requests: Array<requestData>;
  }
  constructor(props) {
    super(props);
    // 将事件系统混入到实例中
    this.init();
    this.state = {
      requests: [{
        Name: 'abc',
        Status: '200',
        Size: '300kb',
        Time: '200ms',
        Url: 'http://localhost:8080'
      }]
    }
    this.clearRequestData = this.clearRequestData.bind(this);
  }
  init() {
    this.proxyXhr();
  }
  proxyXhr() {
    // 获取原型对象，缓存原生方法
    const xhrProto = window.XMLHttpRequest.prototype;
    const origOpen = xhrProto.open;
    const origSend = xhrProto.send;
    // const origSetRequestHeader = xhrProto.setRequestHeader;

    xhrProto.open = function(...arg) {
      const xhr: any = this; // 此时this指向xhr
      xhr.handler = new XhrHandler(xhr); // 获取handler
      
      xhr.addEventListener('readystatechange', () => {
        switch(xhr.readyState) {
          case 2: {
            xhr.handler.handlerHeaders()
          }
          case 4: {
            xhr.handler.handlerDone()
          }
        }
      })
      // 调用缓存的方法
      origOpen.apply(this, arg);
    }
    xhrProto.send = function(data) {
      this.handler.handleSend(data);
      origSend.apply(this, data);
    }
    // 监听send、open事件
    networkEmitter.on('send', this.addReq);
    networkEmitter.on('update', this.updateReq);
  }
  resetXhr() {

  }
  updateReq() {

  }
  addReq(id: Symbol, data: requestData) {
    let req: requestData = {
      Name: '123',
      Status: '123',
      Size: '123',
      Time: '123',
      Url: '123',
    };

  }
  componentWillUnmount() {
    // Emitter.off('send')
  }
  clearRequestData(): void {
    this.setState({
      requests: []
    })
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
