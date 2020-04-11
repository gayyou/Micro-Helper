import React from "react";

export default class LifeCycle extends React.Component {
  state: {
    count: number;
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    setTimeout(() => {
      this.setState({
        count: 2
      })
      setTimeout(() => {
        this.forceUpdate();
      }, 2000);
    }, 2000);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext: any): boolean {
    console.log('我是should', nextContext)
    return false;
  }

  static getDerivedStateFromProps(newProps, preState) {
    console.log(newProps);
    console.log(preState);
    return null;
  }

  render() {
    console.log('我是render')
    return (
      <div>我是LifeCycle测试{this.state.count}</div>
    );
  }
}
