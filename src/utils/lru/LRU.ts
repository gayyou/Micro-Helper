import {isDef} from "../index";

const DEFAULT_LEN = 100;

export class LRU {
  capacity: number;
  size: number;
  map: Map<string, any>;

  constructor(capacity = DEFAULT_LEN) {
    if (capacity <= 0) {
      throw new Error(`Capacity is ${capacity}, it must be positive!`);
    }
    this.capacity = capacity;
    this.map = new Map();
    this.size = 0;
  }

  has(key: string) {
    return this.map.has(key);
  }

  get(key: string) {
    let data = this.map.get(key);

    if (isDef(data)) {
      // 进行调整到队头
      this.adjustToHead(key, data);
    }

    return data;
  }

  private adjustToHead(key: string, val: any) {
    this.map.delete(key);
    this.map.set(key, val);
  }

  set(key: string, val: any) {
    this.adjustToHead(key, val);

    if (this.size === this.capacity) {
      let removeKey = this.map.keys().next().value;
      this.map.delete(removeKey);
      this.size--;
    }

    this.size++;
    return true;
  }

  clear() {
    this.map.clear();
    this.size = 0;
  }
}
