import {makeTriggerProxy, proxyEvent} from "./proxyTool";

/**
 * @description 因为处理后会将属性替换成代理后的属性，本对象是缓存代理前的对象，方便下次进行处理。
 */
const toRaw = new Map();

/**
 * @description 对外的接口，用户通过调用这个方法实现对目标对象进行代理
 * @param parent 目标对象的父亲对象，使用到parent目的是想要在函数内部进行完成代理对象
 * @param targetKey 目标对象在父亲容器中的属性
 * @param key 想要监听的属性
 * @param cb 劫持回调函数
 */
export function subscribeEvent(parent: any, targetKey: string, key: string, cb: Function) {
  let target = parent[targetKey];

  if (toRaw.has(target)) {
    target = toRaw.get(target);
  } else {
    // 如果目标没有被代理过，那么进行代理
    makeTriggerProxy(parent, targetKey);
  }
  // 对目标方法的回调进行调用
  proxyEvent.on(target, key, cb);
  toRaw.set(parent[targetKey], target);
}
