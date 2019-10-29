import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      route: "home",
      isSignedIn: true
    };
  }

  componentDidMount() {
    fetch("https://opensky-network.org/api/states/all")
      .then((response) => response.json())
      .then((states) => this.setState({ cities: states.states }));
  }

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signout") {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: "home" });
  };

  render() {
    return (
      <div>
        {this.state.route === "home" ? (
          <Home states={this.state.cities} />
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
