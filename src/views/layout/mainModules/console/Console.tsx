import './Console.scss';
import React from "react";
import {subscribeEvent} from "@/utils/proxy";
import NormalLog from "./log/NormalLog";
import ErrorLog from "./errorLog/ErrorLog";

/**
 * @description 控制台奥做到两件事：1. 显示浏览器控制台的内容；2. 用户能够像控制台一样输入代码并且执行
 * 1. 模拟控制台输出，需要从以下两种方式进行模拟：劫持控制台输出，监听抛出异常。
 * 2. 模拟控制台的代码，思路是将控制台输入的内容，弄成字符串，并且需要捕获异常，通过try catch包围然后执行
 */

/**
 * @description 控制台输出的每一行的数据
 */
interface ConsoleItem {
  id: number;
  type: LogType;
  consoleType: ConsoleType;
  value: any;
}

enum LogType {
  NORMAL = 'normal',
  WARN = 'warn'
}

const ComponentTypeMatch = {
  normal: NormalLog,
  warn: ErrorLog
};

enum ConsoleType {
  LOG = 'log',
  WARN = 'warn',
  ERROR = 'error',
  INFO = 'info',
  CLEAR = 'clear',
  ASSERT = 'assert',
  DEBUG = 'debug'
}

const initAddConsleOptions = {
  normal: ['log', 'info'],
  warn: ['warn', 'error']
};

/**
 * @description 创建添加输出表项的函数，利用闭包的思想存储输出类型等等
 * @param consoleType 监听的类型
 * @param type 输出形式，分为两种：
 */
function createAddConsoleItemOfTypeFn(this: Console, consoleType: ConsoleType, type: LogType) {
  return (...data) => {
    this.addConsoleItem(data, consoleType, type);
  }
}

let uid: number = 1;

export default class Console extends React.Component {
  state: {
    consoleList: ConsoleItem[];
    consoleInput: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      consoleInput: '',
      consoleList: []
    };
    this.init();
    setTimeout(() => {
      console.log({name: {name: 123}})
    }, 1000);
  }

  createConsoleFuncSubscribe(type: ConsoleType, cb: Function) {
    subscribeEvent(window, 'console', type, cb);
  }

  /**
   * @description 给控制台添加项，并且触发重新渲染机制
   * @param values 劫持console的内容
   * @param consoleType 控制台输出的类型，比如info、log、error等
   * @param type 两大类，第一类是正常输出，第二类错误输出
   */
  addConsoleItem(values: any[], consoleType: ConsoleType, type: LogType) {
    let list = this.state.consoleList;
    for (let value of values) {
      list.push({
        type,
        consoleType,
        value,
        id: uid++
      });
    }

    if (values.length === 0) {
      list.push({
        type,
        consoleType,
        value: undefined,
        id: uid++
      });
    }

    this.setState({
      consoleList: list
    });
  }

  init() {
    // 下面对console打印的内容进行劫持并且添加至list中
    let modeKeys = Object.keys(initAddConsleOptions);

    for (let mode of modeKeys) {
      let arr = initAddConsleOptions[mode];

      for (let item of arr) {
        this.createConsoleFuncSubscribe(item, createAddConsoleItemOfTypeFn.call(this, item, mode));
      }
    }

    // // 下面是进行window的错误事件监听
    // useEffect(() => {
    //   let handler = (event) => {
    //     console.error(event.error);
    //   };
    //   window.addEventListener('error', handler);
    //   window.addEventListener('unhandledrejection', handler);
    //
    //   return () => {
    //     window.removeEventListener('error', handler);
    //     window.removeEventListener('unhandledrejection', handler);
    //   }
    // });
  }

  inputKeyDown = (event) => {
    if (event.keyCode === 13) {
      // 执行代码
      let code = this.state.consoleInput;
      this.setState({
        consoleInput: ''
      });
      let result;

      try {
        // eslint-disable-next-line no-eval
        result = eval(`(${code})`);
      } catch (e) {
        // 如果运行失败，那么添加失败项到控制台中
        console.log(e)
      }
      console.log(result)
    }
  }

  inputChange = (event) => {
    this.setState({
      consoleInput: event.target.value
    });
  }

  render() {
    return (
      <div className="console-container">
        <div className="log-area">
          {this.state.consoleList.map((item) => {
            let Item = ComponentTypeMatch[item.type];
            return (<Item
              data={item.value}
              id={item.id}
              key={item.id}
            />)
          })}
        </div>
        <div className="input-area">
          <input
            value={this.state.consoleInput}
            onKeyDown={this.inputKeyDown}
            onChange={this.inputChange}
          />
        </div>
      </div>
    );
  }
}
