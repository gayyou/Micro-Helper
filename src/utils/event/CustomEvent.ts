import {isDef, isUndef} from "../index";
import {warn} from "../log";

interface Event {
  emit(type: string, data: any): void;
  on(type: string, cb: Function): void;
  remove(type?: string, cb?: Function): void;
  once(type: string, cb: Function): void;
}

export class CustomEvent<T> implements Event {
  private eventMap: Map<string, Array<Function>>;

  constructor() {
    this.eventMap = new Map();
  }

  public emit(type: string, data: T): void {
    let eventSub = this.eventMap.get(type);

    if (isDef(eventSub)) {
      // 如果事件存在回调
      let subShotCut = eventSub.slice();
      try {
        for (let item of subShotCut) {
          item(data);
        }
      } catch (e) {
        // 打印错误
        warn(`Event type ${type} callback error, ${data}`)
      }
    }
  }

  public remove(type?: string, cb?: Function): void {
    if (isUndef(type)) {
      this.eventMap = new Map();
    } else {
      let eventSub = this.eventMap.get(type);

      if (isDef(eventSub)) {
        let newSub = [];

        for (let item of eventSub) {
          if (item !== cb) {
            newSub.push(item);
          }
        }

        this.eventMap.set(type, newSub);
      }
    }
  }

  public on(type: string, cb: Function): void {
    let eventSub = this.eventMap.get(type);
    if (isUndef(eventSub)) {
      this.eventMap.set(type, eventSub = []);
    }

    eventSub.push(cb);
  }

  public once(type: string, cb: Function): void {
    let warp = () => {
      cb();
      this.remove(type, warp);
    };

    this.on(type, warp);
  }
}
