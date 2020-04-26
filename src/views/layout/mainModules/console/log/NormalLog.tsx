import React from "react";
import "./NormalLog.scss";
import {getTargetType} from "@/views/layout/mainModules/console/log/helper/getTargetType";
import ArrowRight from "@assets/icons/arrow_right.png";
import {getPropertyComponentList} from "@views/layout/mainModules/console/log/helper/getPropertyComponentList";

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

  showChildList = () => {
    this.setState({
      isShowChild: !this.state.isShowChild
    });
  };

  render() {
    let valuePreload = getTargetType(this.props.data);
    let enumerableList, unEnumerableList;

    if (this.state.isShowChild) {
      ({enumerableList, unEnumerableList} = getPropertyComponentList(this.props.data,  0));
    }

    return (
      <>
        <div className="normal-log-container"
          onClick={this.showChildList}
        >
          <div className="log-arrow-container">
            <img className="arrow-image" src={ArrowRight} alt="Right Arrow"/>
          </div>
          <span className="log-main-item">{valuePreload}</span>
        </div>
        {this.state.isShowChild && [...enumerableList]}
        {this.state.isShowChild && [...unEnumerableList]}
      </>
    );
  }
}
