/**
 * @author Weybn
 * @description 通过代理的方式得到当前浏览器的各项数据。
 */

interface ScreenInfo {
  innerHeight: number;
  innerWidth: number;
}

let lazy = false;

let getScreenInfo = (): void => {
  let { innerHeight, innerWidth } = window;

  screenInfo.innerWidth = innerWidth;
  screenInfo.innerHeight = innerHeight;
};

let screenInfo: ScreenInfo = {
  innerWidth: 0,
  innerHeight: 0
};

window.addEventListener('resize', () => {
  lazy = true;
});

// 第一次执行的时候得到浏览器的信息
getScreenInfo();

export const screenProxy = new Proxy(screenInfo, {
  get(target: ScreenInfo, p: string | number | symbol, receiver: any): any {
    if (lazy) {
      // 进行更新数据，然后返回
      getScreenInfo();
      lazy = false;
    }

    return Reflect.get(target, p, receiver);
  },
  set(target: ScreenInfo, p: string | number | symbol, value: any, receiver: any): boolean {
    console.error('ScreenInfo can not be setter！');
    return false;
  }
});
