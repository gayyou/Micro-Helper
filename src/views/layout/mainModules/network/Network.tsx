import './Network.scss'
import React from "react";
import {XhrProxy} from './requests';
import Emitter from "@/utils/event/Emitter"
import  RequestContainer from "./components/RequestContainer";

// todos:
// 请求有几种形式：xhr、fetch、jsonp
// 基于事件分发和重写xhr
// 1. xhr重写open和send，用户有可能已经重写过了

export const networkEmitter:Emitter  = new Emitter();


interface request {
  Name: string,
  Status: string,
  Type: string,
  Size: string,
  Time: string,
  URL: string
}


export default class Network extends React.Component {
  constructor(props) {
    super(props);
    // 将事件系统混入到实例中
    this.init();
    this.state = {
      requests: [], 
    }
  }
  init() {
    this.proxyXhr();
  }
  proxyXhr() {
    // 缓存真实的xhr对象
    const realXHR = window.XMLHttpRequest;
    
    // 监听send、open事件
    networkEmitter.on('open', this.addReq);
    networkEmitter.on('send', ()=>{});

    let xhrProxy = new XhrProxy();
  }
  addReq() {
    let req: request = {
      Name: '123',
      Status: '123',
      Type: '123',
      Size: '123',
      Time: '123',
      URL: '123',
    };
    
  }
  render() {
    return (
      <div className="network-container">
        <header className="network-header">
          <button className="network-header-button">clear</button>
        </header>
        <RequestContainer a = '12' />
      </div>
    );
  }
}
