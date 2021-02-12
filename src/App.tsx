import React from 'react';
import './App.css'

import Header from './Header';
import Footer from './Footer';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Header/>
        <Game/>
        <Footer/>
      </div>
    );
  }
}

export default App;
