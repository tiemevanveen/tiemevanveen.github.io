import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AscentsChart from './climbing/components/AscentsChart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AscentsChart />
      </div>
    );
  }
}

export default App;
