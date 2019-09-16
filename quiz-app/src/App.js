import React, { Component } from "react";
import logo from "./svg/logo.svg";
import "./App.css";
import SetSelector from "./components/SetSelector";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);

const authTheme = {
  button: { backgroundColor: "#55677D"},
  a: { color: '#007EB9' }
};

const signUpConfig = {
  hiddenDefaults: ["phone_number"],
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      placeholder: 'Name',
      type: 'name',
      displayOrder: 1
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 2
    }
  ]
};

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

export default withAuthenticator(App, true, [], null, authTheme, signUpConfig);
//export default App;