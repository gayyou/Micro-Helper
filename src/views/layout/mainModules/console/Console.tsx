import './Console.scss';
import React from "react";

export default class Console extends React.Component {
  state: {
    count: number;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    }

    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000)
  }

  render() {
    return (
      <span>{this.state.count}</span>
    );
  }
}
