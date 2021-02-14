import React, { createRef, CSSProperties } from 'react';
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

class Tile extends React.Component<{ value: string, click: () => void }> {
  render() {
    return (
      <div id="Tile" className={ this.props.value.toString() + ' center' } onClick={() => { this.props.click() }}>
        { this.props.value.toString() }
      </div>
    );
  }
}

class Game extends React.Component<{}, { style: CSSProperties, styleOverlay: CSSProperties, squares: string[], next: string, winner: string }> {
  constructor(props: any) {
    super(props);

    this.boardRef = null;

    this.setBoardRef = (el) => {
      this.boardRef = el;
    }
  }

  state = {
    style: {
      width: '32rem',
      height: '32rem'
    },
    styleOverlay: {
      width: '32rem',
      height: '32rem',
      top: 0,
      left: 0,
      display: 'none'
    },
    squares: Array(9).fill(' '),
    next: 'X',
    winner: ' '
  };
  
  boardRef: HTMLElement | null;
  setBoardRef: (instance: HTMLElement | null) => void;
  
  changeSize() {
    let size = (window.innerWidth > (window.innerHeight - fromRem(12))) ?
      (window.innerHeight > fromRem(52)) ? fromRem(34) : window.innerHeight - fromRem(18) :
      (window.innerWidth  > fromRem(42)) ? fromRem(34) : window.innerWidth  - fromRem(8)

    this.setState({
      style: {
        width: toRem(size) + 'rem',
        height: toRem(size) + 'rem'
      },
      styleOverlay: {
        width: toRem(size) + 'rem',
        height: toRem(size) + 'rem',
        top: this.boardRef?.getBoundingClientRect().top,
        left: this.boardRef?.getBoundingClientRect().left,
        display: this.state.styleOverlay.display
      }
    });
  }

  handleClick(number: number) {
    this.changeSize();

    if (this.state.squares[number] === ' ') {
      const sqrs = this.state.squares.slice();
      sqrs[number] = this.state.next;
      
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
  
        if ((sqrs[a] !== ' ') && (sqrs[a] === sqrs[b]) && (sqrs[a] === sqrs[c])) {
          this.setState({
            styleOverlay: {
              width: this.state.styleOverlay.width,
              height: this.state.styleOverlay.height,
              top: this.state.styleOverlay.top,
              left: this.state.styleOverlay.left,
              display: 'grid' 
            },
            winner: sqrs[a]
          });
        }
      }

      this.setState({ 
        squares: sqrs, 
        next: this.state.next === 'X' ? 'O' : 'X' 
      });
    }
  }

  componentDidMount() {
    this.changeSize();
    window.addEventListener("resize", this.changeSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeSize.bind(this));
  }

  resetGame() {
    const sqrs = this.state.squares.slice();
    sqrs.fill(' ');
    this.setState({
      squares: sqrs,
      styleOverlay: {
        width: this.state.styleOverlay.width,
        height: this.state.styleOverlay.height,
        top: this.state.styleOverlay.top,
        left: this.state.styleOverlay.left,
        display: 'none' 
      },
      next: 'X',
      winner: ' '
    });
  }

  render() {
    return (
      <section id="Game" className="center">
        <div className="wrap">
          <section id="Board" style={this.state.style} ref={this.setBoardRef}>
            <Tile value={ this.state.squares[0] } click={() => { this.handleClick(0) }}/>
            <Tile value={ this.state.squares[1] } click={() => { this.handleClick(1) }}/>
            <Tile value={ this.state.squares[2] } click={() => { this.handleClick(2) }}/>
            <Tile value={ this.state.squares[3] } click={() => { this.handleClick(3) }}/>
            <Tile value={ this.state.squares[4] } click={() => { this.handleClick(4) }}/>
            <Tile value={ this.state.squares[5] } click={() => { this.handleClick(5) }}/>
            <Tile value={ this.state.squares[6] } click={() => { this.handleClick(6) }}/>
            <Tile value={ this.state.squares[7] } click={() => { this.handleClick(7) }}/>
            <Tile value={ this.state.squares[8] } click={() => { this.handleClick(8) }}/>
          </section>

          <section id="overlay" style={this.state.styleOverlay} className="center">
            <div className="center">
              <p> Player <strong>{this.state.winner}</strong> wins! </p>
              <button onClick={() => {this.resetGame() }}> Reset Game </button>
            </div>
          </section>

          <section id="info" className="center">
            <p> Next Player: <strong>{this.state.next}</strong> </p>
          </section>
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
