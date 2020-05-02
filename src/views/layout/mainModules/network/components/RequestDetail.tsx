import React from 'react';
import "../Network.scss";
/**
 * @author Jaycole
 */
export default function RequestDetail(props) {
    console.log(props);
    return (
        <div className="network-detail-container">
            <div className="network-detail-header">Genral</div>

            <div className="network-detail-header">Request Headers</div>
            <div className="network-detail-header">Response Headers</div>
            <div className="network-detail-header">Response</div>
        </div>
    )
}