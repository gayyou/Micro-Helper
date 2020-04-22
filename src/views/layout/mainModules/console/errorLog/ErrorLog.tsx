import React from "react";
import "./ErrorLog.scss";

/**
 * @author Weybn
 * @time 2020/4/14 18:42
 * @motto Rare in the World, you are worth it!
 */
export default class ErrorLog extends React.Component {
  props: {
    children?: any;
    data: any;
    id: number
  }

  render() {
    return (
      <div className="error-log-container">
        我是错误
      </div>
    );
  }
}
