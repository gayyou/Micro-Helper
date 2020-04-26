import React from "react";
import RequestItem from "./RequestItem";
import "../Network.scss";
import { requestData } from "../Network";

//   Name: string,
//   Status: string,
//   Size: string,
//   Time: string,
//   URL: string

import emptyIcon from "@/assets/icons/empty.png";


class RequestContainer extends React.Component {
  props: {
    data: Array<requestData>; // 拿到最新的列表
  };
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const requestList = data => {

      return data.map((item, index) => {
        return (
          <RequestItem data = {item} />
        )
      });
    };
    const emptyList = () => 
      (
        <tr>
          <td className="network-empty-status">
              <img src={emptyIcon} alt="emptyicon"/>
              <p>empty</p>
          </td>
        </tr>
      )
    return (
      <table className="table-container">
        <thead className="table-header table-row">
          <tr>
            <td className="first-col">Name</td>
            <td>Status</td>
            <td>Size</td>
            <td>Time</td>
          </tr>
          {/* <td>URL</td> */}
        </thead>
        <tbody>
          {
            this.props.data.length ? requestList(this.props.data) : emptyList()
          } 
        </tbody>  
      </table>
    );
  }
}

export default RequestContainer;
