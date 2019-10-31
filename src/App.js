import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";

const icaos = ['VHHH', 'KATL', 'ZBAA', 'KLAX', 'RJTT', 'OMDB', 'KORD', 'EGLL', 'ZSPD', 'LFPG']

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      route: "",
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
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        {this.state.route === "home" ? (
          <Home onRouteChange={this.onRouteChange} states={this.state.cities} />
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
