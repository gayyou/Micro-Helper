// @ts-ignore
import {proxyEvent, subscribeEvent} from "../proxy";

test('Test subscribe event', () => {
  let count = 0;
  let window = {
    console: {
      log: (...data) => {

      },
      warn: (...data) => {

      }
    }
  };

  // @ts-ignore
  subscribeEvent(window, 'console', 'log', (...data) => {
    count += data.length;
  });
  subscribeEvent(window, 'console', 'warn', (...data) => {
    count += data.length;
  });
  window.console.log(1, 2, 3);
  window.console.warn(1, 2);
  expect(count === 5).toBeTruthy();
});

test('Test ', () => {
  let temp = null;
  let container = {
    arr: [
      (...data) => {console.log(...data)}
    ]
  };

  subscribeEvent(container, 'arr', '0', (...data) => {
    temp = data[0];
  });

  container.arr[0]('abc');
  expect(temp === 'abc').toBeTruthy();
});
