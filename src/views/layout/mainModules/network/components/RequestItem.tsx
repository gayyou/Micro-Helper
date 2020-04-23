import React from "react";
import {requestData} from '../Network'
import '../Network.scss';

export default class RequestItem extends React.Component {
  props: {
    data: requestData
  };
  constructor(props) {
    super(props);
  }
  hanlderClick(e) {
    console.log(123);
  } 
  render() {
    return (
      <tr className="request-item table-row" onClick={this.hanlderClick}>
          <td>{this.props.data.Name}</td>
          <td>{this.props.data.Status}</td>
          <td>{this.props.data.Size}</td>
          <td>{this.props.data.Time}</td>
          {/* <td>{this.props.data.Url}</td> */}
      </tr>
    );
  }
}
