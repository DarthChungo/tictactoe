import React from 'react';
import './Header.css'

import { Bar } from './Misc';

class Header extends React.Component {
  render() {
    return (
      <header id="Header" className="center">
        <h1>Tic Tac Toe</h1>
        <Bar/>
      </header>
    );
  }
}

export default Header;