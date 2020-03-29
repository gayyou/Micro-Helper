import React, {Component} from "react";
import dragImg from "../../assets/icons/tool.png";
import "./DragIcon.scss";
import {screenProxy} from "../../utils/Common";

let isDrag = false;

export default class DragIcon extends Component {
  get screenInfo() {
    return screenProxy;
  }

  state: {
    iconPosi: {
      x: number;
      y: number;
    };
    mouseStartPosi: {
      x: number;
      y: number;
    };
  };

  componentWillUnmount(): void {
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseleave', this.moveOut);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      iconPosi: {
        x: 100,
        y: 100
      },
      mouseStartPosi: {
        x: 0,
        y: 0
      }
    };
    document.addEventListener('mousemove', this.dragMove);
    document.addEventListener('mouseleave', this.moveOut);
    document.addEventListener('mouseup', this.dragEnd);
  }

  dragStart = (event: any) => {
    let { screenX, screenY } = event;
    this.setState({
      mouseStartPosi: {
        x: screenX,
        y: screenY
      }
    });
    isDrag = true;
  };

  dragMove = (event: any) => {
    if (!isDrag) {
      return ;
    }
    let { screenX, screenY } = event;
    let resultX = screenX - this.state.mouseStartPosi.x + this.state.iconPosi.x;
    let resultY = screenY - this.state.mouseStartPosi.y + this.state.iconPosi.y;

    this.setState({
      iconPosi: {
        x: resultX,
        y: resultY
      },
      mouseStartPosi: {
        x: screenX,
        y: screenY
      }
    });
    this.adjust();
  };

  dragEnd = (event: any) => {
    isDrag = false;
    this.adjust();
  };

  moveOut = (event: any) => {
    isDrag = false;
    this.adjust();
  };

  // 对拖拽的代码块进行调整操作
  adjust = () => {
    let { x: oldX, y: oldY } = this.state.iconPosi;
    let x = oldX, y = oldY;

    if (oldX < 0) {
      x = 0
    } else if (oldX > this.screenInfo.innerWidth - 50) {
      x = this.screenInfo.innerWidth - 50;
    }

    if (oldY < 0) {
      y = 0;
    } else if (oldY > this.screenInfo.innerHeight - 50) {
      y = this.screenInfo.innerHeight - 50;
    }

    this.setState({
      iconPosi: {
        x,
        y
      }
    });
  };

  render() {
    return (
      <div className="icon-container"
        style={{transform: `translate(${this.state.iconPosi.x}px, ${this.state.iconPosi.y}px)`}}
        onMouseDown={this.dragStart}
      >
        <div className="icon-layout"/>
        <img className="icon-image" src={dragImg} alt="设置图标" />
      </div>
    );
  }
}
