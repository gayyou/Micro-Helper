import React from "react";
import "./PropertyItem.scss";
import {getTargetType, isReferenceType} from "@views/layout/mainModules/console/log/helper/getTargetType";
import {getPropertyComponentList} from "@views/layout/mainModules/console/log/helper/getPropertyComponentList";

enum PropertyItemEnum {
  ENUMERABLE,
  UN_ENUMERABLE
}

const enumerableStyle = {

};

const unEnumerableStyle = {
  opacity: .5
};

/**
 * @author Weybn
 * @time 2020/4/20 15:08
 * @motto Rare in the World, you are worth it!
 */
function getPropertyComponentClassHOC(type: PropertyItemEnum) {
  let keyStyle = type === PropertyItemEnum.ENUMERABLE ? enumerableStyle : unEnumerableStyle;

  return class extends React.Component {
    props: {
      // 缩进
      indent: number;
      // 显示的目标对象
      target: {
        key: string;
        value: any;
      };
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

    render = () => {
      let {value} = this.props.target;
      let {indent} = this.props;
      let valuePreload = getTargetType(value);
      let enumerableList, unEnumerableList;
      let isComplex = isReferenceType(value);

      if (this.state.isShowChild) {
        ({enumerableList, unEnumerableList} = getPropertyComponentList(value, indent + 1));
      }

      return (
        <>
          <div className={isComplex ? this.state.isShowChild ?
            "property-item-container property-item-normal property-item-active" : "property-item-container property-item-normal"
            : "property-item-container"}
            style={{
              marginLeft: this.props.indent * 10
            }}
            onClick={isComplex ? this.showChildList : null}
          >
            <div className="property-item">
              <span className="property-item-key"
                style={keyStyle}
              >{this.props.target.key}&nbsp;:&nbsp;&nbsp;</span>
              <span className="property-item-value">{valuePreload}</span>
            </div>
          </div>
          {this.state.isShowChild && [...enumerableList]}
          {this.state.isShowChild && [...unEnumerableList]}
        </>
      );
    }
  };
}

export const EnumerablePropertyItem = getPropertyComponentClassHOC(PropertyItemEnum.ENUMERABLE);

export const UnEnumerablePropertyItem = getPropertyComponentClassHOC(PropertyItemEnum.UN_ENUMERABLE);
