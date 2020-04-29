import React from "react";
import {requestData} from '../Network'
import '../Network.scss';

export default class RequestItem extends React.Component {
  props: {
    data: requestData
  };
  
  private hanlderClick(e): void {
    e.preventDefault();
    
    console.log(123);
  } 
  render() {
    const {name, status, size, time} = this.props.data;
    return (
      <tr className="request-item table-row" data-id="">
          <td>{name}</td>
          <td>{status}</td>
          <td className="text-right-col">{size}</td>
          <td className="text-right-col">{time}</td>
      </tr>
    );
  }
}
