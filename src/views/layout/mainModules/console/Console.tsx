import './Console.scss';
import React from "react";
import {subscribeEvent} from "@/utils/proxy";
import NormalLog from "./log/NormalLog";
import ErrorLog from "./errorLog/ErrorLog";
import LogFilter from "@views/layout/mainModules/console/logFilter/LogFilter";

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
  consoleType: string;
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

const initAddConsoleOptions = {
  normal: ['log', 'info'],
  warn: ['warn', 'error']
};

export const logTypeArray = ['all', 'log', 'info', 'error', 'warn'];

let errorEventHandler = (event) => {
  console.error(event.error);
};

/**
 * @description 创建添加输出表项的函数，利用闭包的思想存储输出类型等等
 * @param consoleType 监听的类型
 * @param type 输出形式，分为两种：
 */
function createAddConsoleItemOfTypeFn(this: Console, consoleType: string, type: LogType) {
  return (...data) => {
    this.addConsoleItem(data, consoleType, type);
  }
}

let uid: number = 1;

export default class Console extends React.Component {
  state: {
    consoleList: ConsoleItem[];
    consoleInput: string;
    consoleListCache: ConsoleItem[];
    currentType: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      consoleInput: '',
      consoleList: [],
      consoleListCache: [],
      currentType: 'all'
    };
    this.init();
    setTimeout(() => {
      console.log({
        map: new Map(),
        set: new Set(),
        date: new Date(),
        pattern: new RegExp(/\d/),
        math: Math,
        symbol: Symbol(),
        weakMap: new WeakMap(),
        weakSet: new WeakSet(),
        string: 'String',
        number: 1,
        boolean: true,
        Undefined: undefined,
        Null: null,
        array: [],
        object: {}
      })
    }, 1000);
  }

  createConsoleFuncSubscribe(type: string, cb: Function) {
    subscribeEvent(window, 'console', type, cb);
  }

  /**
   * @description 给控制台添加项，并且触发重新渲染机制
   * @param values 劫持console的内容
   * @param consoleType 控制台输出的类型，比如info、log、error等
   * @param type 两大类，第一类是正常输出，第二类错误输出
   */
  addConsoleItem(values: any[], consoleType: string, type: LogType) {
    let {consoleListCache, consoleList, currentType} = this.state;
    // 标志量，用来标志是否应当更新当前的渲染层，可以减少不必要的更新操作
    let consoleListIsChanged = false;

    // 如果控制台输出的长度为空的话，那么说明输出了undefined，此时要进行添加数据
    if (values.length === 0) {
      values.push(undefined);
    }

    for (let value of values) {
      let item = {
        type,
        consoleType,
        value,
        id: uid++
      };

      consoleListCache.push(item);

      if (consoleType === currentType || currentType === 'all') {
        // 如果添加的项的类型是当前类型的话，那么顺便添加到consoleList中
        consoleList.push(item);
        consoleListIsChanged = true;
      }
    }

    if (consoleListIsChanged) {
      this.setState({
        consoleList: consoleList
      });
    }
  }

  init() {
    // 下面对console打印的内容进行劫持并且添加至list中
    let modeKeys = Object.keys(initAddConsoleOptions);

    for (let mode of modeKeys) {
      let arr = initAddConsoleOptions[mode];

      for (let item of arr) {
        this.createConsoleFuncSubscribe(item, createAddConsoleItemOfTypeFn.call(this, item, mode));
      }
    }
    window.addEventListener('error', errorEventHandler);
    window.addEventListener('unhandledrejection', errorEventHandler);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', errorEventHandler);
    window.removeEventListener('unhandledrejection', errorEventHandler);
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

  /**
   * @description 控制台输出逻辑处理
   * @param event react的事件实例
   */
  inputChange = (event) => {
    this.setState({
      consoleInput: event.target.value
    });
  };

  /**
   * @description 根据console的类型进行选择显示
   * @param type 控制台输出的类型
   */
  filterConsoleItem = (type: string) => {
    let {currentType, consoleListCache} = this.state;

    if (type === currentType) {
      // 选择的内容和上次一样的话，是不需要进行更新的
      return ;
    }

    let newConsoleList;

    if (type === 'all') {
      // 全部的时候将所有内容进行更新，此时直接采取引用的方式来
      newConsoleList = consoleListCache;
    } else {
      // 其余情况的话就㤇重新创建数组然后赋值
      newConsoleList = [];

      for (let item of consoleListCache) {
        if (item.consoleType === type) {
          newConsoleList.push(item);
        }
      }
    }

    this.setState({
      consoleList: newConsoleList,
      currentType: type
    });
  };

  clearConsole = () => {
    this.setState({
      consoleList: [],
      consoleListCache: []
    });
  };

  render() {
    return (
      <div className="console-container">
        <LogFilter
          selectHandler={this.filterConsoleItem}
          clearHandler={this.clearConsole}
          currentFilterType={this.state.currentType}
        />
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
