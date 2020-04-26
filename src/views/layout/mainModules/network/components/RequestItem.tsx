import React from "react";
import {requestData} from '../Network'
import '../Network.scss';

export default class RequestItem extends React.Component {
  props: {
    data: requestData
  };
  
  hanlderClick(e) {
    console.log(123);
  } 
  render() {
    const {name, status, size, time} = this.props.data;
    return (
      <tr className="request-item table-row" onClick={this.hanlderClick}>
          <td>{name}</td>
          <td>{status}</td>
          <td>{size}</td>
          <td>{time}</td>
      </tr>
    );
  }
}
