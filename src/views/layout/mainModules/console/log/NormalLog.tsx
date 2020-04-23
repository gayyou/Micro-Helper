import React from "react";
import "./NormalLog.scss";
import {getTargetType} from "@/views/layout/mainModules/console/log/helper/getTargetType";
import ArrowRight from "@assets/icons/arrow_right.png";
import {getPropertyObject} from "@views/layout/mainModules/console/log/helper/getPropertyObject";

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
  };

  state: {
    isShowChild: boolean;
  } = {
    isShowChild: false
  };

  render() {
    let showString = getTargetType(this.props.data);
    let childList = [];

    if (this.state.isShowChild) {
      let {enumerableProperty, unEnumerableProperty} = getPropertyObject(this.props.data);

      for (let item of enumerableProperty) {
        childList.push()
      }

      for (let item of unEnumerableProperty) {

      }
    }

    return (
      <>
        <div className="normal-log-container">
          <div className="log-arrow-container">
            <img className="arrow-image" src={ArrowRight} alt="Right Arrow"/>
          </div>
          <span className="log-main-item">{showString}</span>
        </div>
      </>
    );
  }
}
