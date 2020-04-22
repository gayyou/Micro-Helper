import React from "react";
import RequestItem from "./RequestItem";
import '../Network.scss'

class RequestContainer extends React.Component {
    props: {
        a: string
    }
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="request-container">
            <div className="request-header">
                <span>Name</span>
                <span>Status</span>
                <span>Type</span>
                <span>Size</span>
                <span>Time</span>
                <span>URL</span>
            </div>
        </div>
    );
  }
}

export default RequestContainer;
