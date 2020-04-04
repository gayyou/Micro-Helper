import React, {Component} from "react";
import {subscribeEvent} from "../../utils/proxy";

const ThemeContext = React.createContext('light');

export default class ContextTest extends Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value={'abc'}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
  componentDidMount(): void {
    let temp = null;
    let container = {
      arr: [
        (...data) => {}
      ]
    };

    subscribeEvent(container, 'arr', '0', (...data) => {
      temp = data[0];
    });

    container.arr[0]('abc');
    console.log(temp)  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <div>
      {this.context}
    </div>;
  }
}
