import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import SignIn from "./Components/SignIn";

const icaos = [
  "VHHH",
  "KATL",
  "ZBAA",
  "KLAX",
  "RJTT",
  "OMDB",
  "KORD",
  "EGLL",
  "ZSPD",
  "LFPG"
];

const names = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      route: "",
      isSignedIn: true
    };
  }

  airportList = (icao) => {
    fetch(`https://airport-info.p.rapidapi.com/airport?icao=${icao}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "airport-info.p.rapidapi.com",
        "x-rapidapi-key": "ac60c9fd4fmsh2e2f091de78beb3p109374jsnc3811b15c3e5"
      }
    })
      .then((response) => response.json())
      .then((response) => {
        var obj = {};
        obj["name"] = response.name;
        obj["icao"] = response.icao;
        obj["location"] = response.location;
        names.push(obj);
        this.setState({ cities: names });
      });
  };

  city = () => {
    icaos.map((icao) => this.airportList(icao));
  };

  componentDidMount() {
    this.city();
  }

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signin") {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        {this.state.route === "home" ? (
          <Dashboard
            onRouteChange={this.onRouteChange}
            names={this.state.cities}
          />
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
