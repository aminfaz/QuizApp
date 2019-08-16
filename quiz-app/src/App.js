import React, { Component } from "react";
import logo from "./svg/logo.svg";
import "./App.css";
import SetSelector from "./components/SetSelector";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: ""
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </div>
        <SetSelector sessionToken="" />
      </div>
    );
  }
}

export default App;
