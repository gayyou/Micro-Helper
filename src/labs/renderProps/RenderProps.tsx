import React from "react";

export default class RenderProps extends React.Component {
  render() {
    return (
      <>
        <Mouse render={() => <div>2</div>}/>
      </>
    );
  }
}

class Mouse extends React.Component {
  props: {
    render: Function
  };

  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}
