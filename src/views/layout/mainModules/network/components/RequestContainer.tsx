import React from "react";
import RequestItem from "./RequestItem";
import "../Network.scss";
import { RequestDataType } from "../Network";
import emptyIcon from "@/assets/icons/empty.png";

function RequestContainer(props: any) {
  const requestList = () => {
    return props.data.map((item: any) => (
      <RequestItem data={item} key={item.id} />
    ));
  };
  const emptyList = () => (
    <tr>
      <td className="network-empty-status">
        <img src={emptyIcon} alt="emptyicon" />
        <p>empty</p>
      </td>
    </tr>
  );
  return (
    <table className="table-container">
      <thead className="table-header table-row">
        <tr>
          <td className="first-col">Name</td>
          <td>Status</td>
          <td>Size</td>
          <td>Time</td>
        </tr>
      </thead>
      <tbody>{props.data.length ? requestList() : emptyList()}</tbody>
    </table>
  );
}

export default RequestContainer;
