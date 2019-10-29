import React from 'react';
import './App.css';
import Home from './Components/Home';
import SignIn from './Components/SignIn';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Home /> */}
        <SignIn />
      </header>
    </div>
  );
}

export default App;
