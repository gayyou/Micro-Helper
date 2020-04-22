import React from "react";
import "./NormalLog.scss";
import {getTargetType} from "@/views/layout/mainModules/console/log/propertyItem/helper/getTargetType";

/**
 * @author Weybn
 * @time 2020/4/14 18:43
 * @motto Rare in the World, you are worth it!
 */
export default class NormalLog extends React.Component {
  props: {
    children?: any;
    data: any;
    id: number
  }

  render() {
    let showString = getTargetType(this.props.data);

    return (
      <div className="normal-log-container">
        {showString}
      </div>
    );
  }
}
