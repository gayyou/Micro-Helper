import React from "react";
import { XhrDataType } from "../Network";
import '../Network.scss';
import { networkEmitter } from '../index';

export default class RequestItem extends React.Component {
  props: {
    data: XhrDataType
  };
  private hanlderClick = ():void => {
    networkEmitter.emit('open', this.props.data);
  } 
  render() {
    const {name, status, size, time, id} = this.props.data;
    return (
      <tr className="request-item table-row" onClick={this.hanlderClick}>
          <td>{name}</td>
          <td>{status}</td>
          <td className="text-right-col">{size}</td>
          <td className="text-right-col">{time}</td>
      </tr>
    );
  }
}
