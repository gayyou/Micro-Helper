import {isDef} from "../index";

const DEFAULT_LEN = 100;

export class LRU<T> {
  capacity: number;
  size: number;
  map: Map<string, T>;

  constructor(capacity = DEFAULT_LEN) {
    if (capacity <= 0) {
      throw new Error(`Capacity is ${capacity}, it must be positive!`);
    }

    this.capacity = capacity;
    this.map = new Map();
    this.size = 0;
  }

  public has(key: string): boolean {
    return this.map.has(key);
  }

  public get(key: string): T {
    let data = this.map.get(key);

    if (isDef(data)) {
      // 进行调整到队头
      this.adjustToHead(key, data);
    }

    return data;
  }

  private adjustToHead(key: string, val: T): void {
    this.map.delete(key);
    this.map.set(key, val);
  }

  public set(key: string, val: T): boolean {
    this.adjustToHead(key, val);

    if (this.size === this.capacity) {
      let removeKey = this.map.keys().next().value;
      this.map.delete(removeKey);
      this.size--;
    }

    this.size++;
    return true;
  }

  public clear(): void {
    this.map.clear();
    this.size = 0;
  }

  public [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }

  public entries(): IterableIterator<[string, T]> {
    return this.map.entries();
  }

  public values(): IterableIterator<T> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.map.values();
  }

  public keys(): IterableIterator<string> {
    return this.map.keys();
  }
}
