import React from 'react';
import "./Drawer.scss";

/**
 * @author Jaycole
 * @description A panel which slides in from the edge of the screen.
 * 
 */
export default class Drawer extends React.Component {
    props: {
        visiable: boolean,
        children: any,
        onClose: Function,
        title?: string
    }
    state: {
        cs: string
    }
    constructor(props) {
        super(props);
        this.state = {
            cs: "jc-drawer jc-drawer-open"
        }
    }
    render() {
        let cs: string = this.props.visiable ? "jc-drawer jc-drawer-open" : "jc-drawer";
        let drawerStyle = this.props.visiable ? {} : {transform: 'translateX(100%)'} 
        const _renderBody = () => React.createElement("div", {className: "jc-drawer-body"}, this.props.children);
        return(
            <div className={cs}>
                <div className="jc-drawer-mask" onClick={()=>{this.props.onClose()}} />
                <div className="jc-drawer-content-wrapper" style={drawerStyle}>
                    <div className="jc-drawer-content">
                        <div className="jc-drawer-header">
                            {this.props.title || "Detail"}
                        </div>
                        {_renderBody()}
                    </div>
                </div>
            </div>
        )
    }
}