import React, {useState} from "react";
import "./ErrorLog.scss";

// TODO 如何更好区分用户的选择和鼠标点击切换显示调用栈帧？
//      目前使用的是判断用户是否移动一段距离（目前小于一个字符）

/**
 * @author Weybn
 * @time 2020/4/14 18:42
 * @motto Rare in the World, you are worth it!
 */
export default function ErrorLog(props: {
  children?: any;
  data: any;
  id: number;
}) {
  let [isOpenStack, setIsOpenStack] = useState(false);
  let {data} = props;
  let stackMessage = data.stack || '';
  let resolveStackArray = stackMessage.split(/\n/).slice(1);
  let moveStartPositionX;

  return (
    <div className="error-log-container"
      onMouseDown={(event) => {
        moveStartPositionX = event.clientX;
      }}
      onMouseUp={(event) => {
        if (Math.abs(moveStartPositionX - event.clientX) < 10) {
          // 又发生点击，又有移动，那么此时就可以切换调用栈帧的显示状态
          setIsOpenStack((preState) => !preState)
        }
      }}
    >
      <span className="icon-span">
        <svg d="1589699684062" className="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="3183" width="15px" height="15px">
          <path
            d="M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384m0-832C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64"
            fill="#d81e06" p-id="3184"/>
          <path
            d="M665.376 313.376L512 466.752l-153.376-153.376-45.248 45.248L466.752 512l-153.376 153.376 45.248 45.248L512 557.248l153.376 153.376 45.248-45.248L557.248 512l153.376-153.376z"
            fill="#d81e06" p-id="3185"/>
        </svg>
      </span>
      <div className="error-log-detail">
        <span className="error-log-item">{data.toString()}</span>
        {isOpenStack && resolveStackArray.map((item) => <span className="error-log-item" key={item}>{item}</span>)}
      </div>
    </div>
  );
}
