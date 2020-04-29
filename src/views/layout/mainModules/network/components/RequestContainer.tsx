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
    data: Array<requestData>;
    openMask: Function,
    children?: any
  };
  handleClick = e => {

    // find current request

    // send current request data
    this.props.openMask();
  }
  render() {
    const requestList = () => {
      // console.log(this.props.data)
      return this.props.data.map((item: any) => (<RequestItem data = {item} key={item.id} />));
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
            <td >Status</td>
            <td>Size</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody onClick={this.handleClick}>
          {this.props.data.length ? requestList() : emptyList()} 
        </tbody>  
      </table>
    );
  }
}

export default RequestContainer;
