import React from 'react';

import GameBoard from './GameBoard';
import Keyboard from './Keyboard';

import './App.css';

function App() {
  const [board, setBoard] = React.useState(Array(6).fill(Array(6).fill('')));
  const [guess, setGuess] = React.useState<number>(1);
  const [position, setPosition] = React.useState<number>(1);

  const onKeypress = (key: string) => {
    const boardCopy = [...board];
    const rowCopy = [...boardCopy[guess - 1]];

    // If the key is a number, set the position to that number
    if (key === 'OK') {
      if(position !== 7){
        //TODO: handle error
        return;
      }
      // TODO: check if guess is correct
      setGuess(guess + 1);
      setPosition(1);
    } else if (key === '<<') {
      if (position === 1) {
        return;
      }
      rowCopy[position - 2] = '';
      boardCopy[guess - 1] = rowCopy;
      setPosition(position - 1);
    } else {
      if (position === 7) {
        return;
      }
      rowCopy[position - 1] = key;
      boardCopy[guess - 1] = rowCopy;
      setPosition(position + 1);
    }
    setBoard(boardCopy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordz</h1>
      </header>
      <GameBoard board={board} />
      <Keyboard onKeypress={onKeypress} />
    </div>
  );
}

export default App;
