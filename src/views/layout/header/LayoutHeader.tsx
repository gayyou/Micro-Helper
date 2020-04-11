import React from "react";
import "./LayoutHeader.scss";


export default class LayoutHeader extends React.Component {
  props: {
    headerList: string[];
    index: number;
    changeModuleIndex: Function;
  };

  render() {
    return (
      <div className="micro-layout-header">
        {this.props.headerList.map((item, index) =>
          <span className={index === this.props.index ? 'micro-layout-header-item micro-layout-header-item-active' : 'micro-layout-header-item'}
            key={item}
            onClick={() => this.props.changeModuleIndex(index)}
          >
            {item}
          </span>
        )}
        <div className="micro-helper-bottom-line"
          style={{transform: `translateX(${this.props.index * 90}px)`}}
        />
      </div>
    );
  }
}
