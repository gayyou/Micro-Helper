import React, {Component} from "react";
import dragImg from "../../assets/icons/tool.png";
import "./DragIcon.scss";
import {screenProxy} from "../../utils/screenInfo";
import {isMobile} from "../../utils/userAgent";
import {isDef} from "../../utils";
import {warn} from "../../utils/log";

// 初始化变量
let isDrag = false;
let moveEventType = 'mousemove';
let endEventType = 'mouseup';
let outEventType = 'mouseleave';

// if mobile
if (isMobile) {
  moveEventType = 'touchmove';
  endEventType = 'touchend';
  outEventType = 'touchleave';
}

// get user operation position
function getEventPosition(event: any) {
  let pageX, pageY;
  if (isDef(event.pageX) && isDef(event.pageY)) {
    ({ pageX, pageY } = event);
  } else if (isDef(event.touches[0])) {
    ({ pageX, pageY } = event.touches[0]);
  } else {
    warn('Can not get user operation position!');
  }

  return {
    pageX,
    pageY
  }
}

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
    document.removeEventListener(moveEventType, this.dragMove);
    document.removeEventListener(endEventType, this.dragEnd);
    document.removeEventListener(outEventType, this.dragEnd);
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
  }

  componentDidMount(): void {
    document.addEventListener(moveEventType, this.dragMove);
    document.addEventListener(endEventType, this.dragEnd);
    document.addEventListener(outEventType, this.dragEnd);
  }

  dragStart = (event: any) => {
    let { pageX, pageY } = getEventPosition(event);

    this.setState({
      mouseStartPosi: {
        x: pageX,
        y: pageY
      }
    });
    isDrag = true;
  };

  dragMove = (event: any) => {
    if (!isDrag) {
      return ;
    }
    let { pageX, pageY } = getEventPosition(event);

    let resultX = pageX - this.state.mouseStartPosi.x + this.state.iconPosi.x;
    let resultY = pageY - this.state.mouseStartPosi.y + this.state.iconPosi.y;

    this.setState({
      iconPosi: {
        x: resultX,
        y: resultY
      },
      mouseStartPosi: {
        x: pageX,
        y: pageY
      }
    });
    this.adjust();
  };

  dragEnd = () => {
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
        onTouchStart={this.dragStart}
      >
        <div className="icon-layout"/>
        <img className="icon-image" src={dragImg} alt="设置图标" />
      </div>
    );
  }
}
