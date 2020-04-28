import React from "react";
import {logTypeArray} from "@views/layout/mainModules/console/Console";
import "./LogFilter.scss";
import Forbidden from "@assets/icons/forbidden.png";

/**
 * @author Weybn
 * @time 2020/4/26 10:59
 * @motto Rare in the World, you are worth it!
 */
export default class LogFilter extends React.Component {
  props: {
    selectHandler: (type: string) => void;
    clearHandler: () => void;
    currentFilterType: string;
  };

  render() {
    return (
    <div className="log-filter-container">
      <img
        className="clear-image"
        src={Forbidden}
        alt="forbidden"
        onClick={this.props.clearHandler}
      />
      {logTypeArray.map((item) => (
        <span
          className={item === this.props.currentFilterType ? "log-filter-active log-filter-item" : "log-filter-item"}
          key={item}
          onClick={() => this.props.selectHandler(item)}
        >{item}</span>
      ))}
    </div>);
  }
}
