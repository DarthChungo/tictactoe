import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

function toRem(px: number): number {
  return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function fromRem(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export class Bar extends React.Component {
  render() {
    return (
      <div id="Bar">
        <hr/>
      </div>
    );
  }
}

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

class Game extends React.Component<{}, { style: CSSProperties }> {
  state = { 
    style: {
      width: '32rem',
      height: '32rem'
    }
  };

  changeSize() {
    let size = (window.innerWidth > (window.innerHeight - fromRem(12))) ? 
      (window.innerHeight > fromRem(52)) ? fromRem(34) : window.innerHeight - fromRem(18) :
      (window.innerWidth  > fromRem(42)) ? fromRem(34) : window.innerWidth  - fromRem(8)

    this.setState({
      style: {
        width: toRem(size) + 'rem',
        height: toRem(size) + 'rem'
      }
    });
  }

  componentDidMount() {
    this.changeSize();
    window.addEventListener("resize", this.changeSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeSize.bind(this));
  }

  render() {
    return (
      <section id="Game" className="center">
        <div id="Board" style={this.state.style}>
          <div className="el n1"></div>
          <div className="el n2"></div>
          <div className="el n3"></div>
          <div className="el n4"></div>
          <div className="el n5"></div>
          <div className="el n6"></div>
          <div className="el n7"></div>
          <div className="el n8"></div>
          <div className="el n9"></div>
        </div>
      </section>
    );
  }
}

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

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
