import {warn} from "../log";
import {isArray, isFunc, isPlainObject, isUndef} from "../index";
import {ProxyEvent} from "./ProxyEvent";

export const proxyEvent = new ProxyEvent();

/**
 * @description 使用map来存储代理后的数据结构
 */
let proxyToKeyMap: Map<any, Map<string, Function>> = new Map();

export const isProxy = (tar: any) => {
  return proxyToKeyMap.has(tar);
}

/**
 * @description 代理handler
 */
const proxyHandler = {
  get(target, key, receiver) {
    // 拿到劫持的方法map，再通过判断返回内容
    return proxyToKeyMap.get(target).get(key);
  },
  set(target, key, value, receiver) {
    // 允许重新进行代理设置，这样增加了可拓展性
    proxyToKeyMap.get(target).set(key, value);
    return true;
  }
};

/**
 * @description 使用代理将某个对象的属性进行劫持，前提是这个属性需要是一个对象或者数组
 * @param target 传进来想要被代理对象的父对象
 * @param key 想要被代理的对象
 */
export const makeTriggerProxy = (target, key) => {
  if (isUndef(target) || isUndef(target[key])) {
    return warn(`${target} or ${target[key]} is undefined, should proxy Object`);
  }

  let raw = target[key];
  let keyMap: Map<string, Function> = proxyToKeyMap.get(raw);

  if (isUndef(keyMap)) {
    proxyToKeyMap.set(raw, keyMap = new Map());
  }

  if (isArray(raw)) {
    // 拿出所有下标，判断是方法的话，进行监听
    let len = raw.length;

    while(len--) {
      let item = raw[len];

      if (isFunc(item)) {
        // 封装函数进行拦截，首要任务是进行设定回调类型
        triggerHijack(raw, item, len.toString(), keyMap);
      }
    }
  } else if (isPlainObject(raw)) {
    // 拿出所有键值，进行监听
    let keys = Object.keys(raw);
    let len = keys.length;

    while (len--) {
      let item = raw[keys[len]];
      if (isFunc(item)) {
        triggerHijack(raw, item, keys[len], keyMap);
      }
    }
  } else {
    return warn(`Should proxy Array or Object!`);
  }

  // 进行劫持完毕后要进行代理操作
  target[key] = new Proxy(raw, proxyHandler);
};

/**
 * @description 进行触发事件的劫持函数方法，并且注册到KeyMap中
 * @param raw 被劫持对象
 * @param func 原生函数
 * @param name 被劫持对象的方法名
 * @param containerMap 容器
 */
const triggerHijack = (raw: any, func: Function, name: string, containerMap: Map<string, Function>): void => {
  // 这里不能是箭头函数，因为有的方法需要使用到this，得是一个普通函数
  function cb(...args) {
    // 这里进行触发事件，并且将数据进行传递
    proxyEvent.emit(raw, name, ...args);
    func.call(this, ...args);
  }

  containerMap.set(name, cb);
};

// const listenerHijack = () => {
//
// };
