import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signout") {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        {this.state.route === "home" ? (
          <Home />
        ) : (
          <div className="App">
            <header className="App-header">
              <SignIn onRouteChange={this.onRouteChange} />
            </header>
          </div>
        )}
      </div>
    );
  }
}

export default App;
