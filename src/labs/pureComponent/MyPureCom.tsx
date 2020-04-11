import React from "react";
import memoize from "memoize-one";

export default class MyPureCom extends React.PureComponent {
  state: {
    count: {
      count: number
    }
  } = {
    count: {
      count: 1
    }
  };

  constructor(props: any) {
    super(props);
    let a = this.state.count.count;
    console.log(memoize);
    setInterval(() => {
      this.setState({
        count: a
      })
    }, 1000);
  }

  render() {
    console.log('123')
    return (<div>
    </div>);
  }
}
