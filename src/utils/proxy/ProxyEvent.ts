import {isDef, isUndef} from "../index";
import {log} from "../log";

/**
 * @description 专门为代理系统设计的事件类
 * @param eventMap Map<Object, Map<key, Function>> 每个对象实例都有一个map，map是这个对象的所有key的监听事件，这样可以
 * 实现不同对象不同属性的劫持
 */
export class ProxyEvent {
  eventMap: Map<any, Map<string, Array<Function>>>;

  constructor() {
    this.eventMap = new Map();
  }

  on(target: any, key: any, cb: Function) {
    let keyMap = this.eventMap.get(target);

    if (isUndef(keyMap)) {
      this.eventMap.set(target, keyMap = new Map<string, Array<Function>>());
    }

    let eventSub = keyMap.get(key);
    if (isUndef(eventSub)) {
      keyMap.set(key, eventSub = []);
    }

    eventSub.push(cb);
  }

  remove(target?: any, key?: any, cb?: Function) {
    if (isUndef(target)) {
      this.eventMap = new Map();
    } else if (isUndef(key)) {
      this.eventMap.set(target, new Map<string, Array<Function>>());
    } else {
      let keyMap = this.eventMap.get(target);
      let eventSub = keyMap.get(key);

      if (isDef(eventSub)) {
        let newSub = [];

        for (let item of eventSub) {
          if (item !== cb) {
            newSub.push(item);
          }
        }

        keyMap.set(key, newSub);
      }
    }
  }

  emit(target: any, key?: any, ...data) {
    if (!this.eventMap.has(target)) {
      return ;
    }

    let keyMap = this.eventMap.get(target);

    let eventSub = keyMap.get(key);

    if (isDef(eventSub)) {
      // 如果事件存在回调
      let subShotCut = eventSub.slice();

      try {
        for (let item of subShotCut) {
          item(...data);
        }
      } catch (e) {
        // 打印错误
        log(e);
      }
    }
  }

  once(target: any, key: string, cb: Function) {
    let warp = (...data) => {
      cb(...data);
      this.remove(target, key, warp);
    };

    this.on(target, key, warp);
  }
}
