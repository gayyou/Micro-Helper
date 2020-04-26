import React from "react";
import "./Layout.scss";
import LayoutHeader from "./header/LayoutHeader";
import Console from './mainModules/console/Console'
import Elements from "./mainModules/elements/Elements";
import Network from "./mainModules/network/Network";
import Resources from "./mainModules/resources/Resources";
import Setting from "./mainModules/setting/Setting";
import KeepAlive from "../../labs/keep-alive/KeepAlive";

const layoutMainList: any[] = [
  Console,
  Network,
  Elements,
  Resources,
  Setting
];

export default class Layout extends React.Component {
  state: {
    headerList: string[];
    index: number;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      headerList: [
        'Console',
        'NetWork',
        'Elements',
        'Resource'
      ],
      index: 0
    };
  }

  changeModuleIndex = (index) => {
    this.setState({
      index
    });
  }

  render() {
    let DisplayModule = layoutMainList[this.state.index];

    return (
      <div className="micro-helper-layout">
        <LayoutHeader
          headerList={this.state.headerList}
          index={this.state.index}
          changeModuleIndex={this.changeModuleIndex}
        />
        <div className="micro-helper-layout-main">
          <KeepAlive>
            <DisplayModule key={this.state.index.toString()}/>
          </KeepAlive>
        </div>
      </div>
    );
  }
}
