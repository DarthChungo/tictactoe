import React from 'react';
import './Footer.css'

import { Bar } from './Misc';

class Footer extends React.Component {
  render() {
    return (
      <footer id="Footer" className="center">
        <Bar/>
        <ul>
          <li>
            Tic Tac Toe
          </li>
          <li>
            Copyright &copy; 2021
          </li>
          <li>
            <a href="https://www.github.com/DarthChungo/tictactoe" target="_blank" rel="noreferrer">Source Code</a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
