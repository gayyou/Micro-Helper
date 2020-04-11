// @ts-ignore
import {LRU} from "../LRU";

test('lru exception test', () => {
  expect(() => new LRU(-1)).toThrowError('Capacity is -1, it must be positive!');
  expect(() => new LRU(0)).toThrowError('Capacity is 0, it must be positive!');
});

test('lru base test', () => {
  let lru = new LRU();
  expect(lru.capacity === 100).toBeTruthy();
  lru.set('1', 2);
  expect(lru.size === 1).toBeTruthy();
  let lru2 = new LRU(2);
  expect(lru2.capacity === 2).toBeTruthy();
});

test('lru base test', () => {
  let lru = new LRU(2);
  lru.set('1', 1);
  lru.set('2', 2);
  lru.set('3', 3);
  console.log(lru.get('1'));
  expect(lru.get('1')).toBeUndefined();
  let lru2 = new LRU();
  lru2.set('1', 1);
  lru2.set('2', 2);
  lru2.set('3', 3);
  expect(lru2.size === 3).toBeTruthy();
  expect(lru2.capacity === 100).toBeTruthy();
});
