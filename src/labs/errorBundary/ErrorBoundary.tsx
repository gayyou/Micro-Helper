import React from "react";

export default class ErrorBoundary extends React.Component {
  state: {
    errorInfo: React.ErrorInfo;
    error: Error;
  };

  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo !== null) {
      return (<div>{this.state.errorInfo}</div>);
    }
    return this.props.children;
  }
}


