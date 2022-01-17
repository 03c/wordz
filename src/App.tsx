import React from 'react';

import GameBoard, { BlankBoard, Board, Row } from './GameBoard';
import Keyboard from './Keyboard';

import './App.css';

type State = {
  word: string; //TODO: get this from a list of words
  usedLetters: string[];
  guessNumber: number;
  cursorPosition: number;
  board: Board;
};

type Action =
  | { type: 'GUESS' }
  | { type: 'BACK' }
  | { type: 'TYPE'; key: string };

function reducer(state: State, action: Action): State {
  const boardCopy = { ...state.board };
  switch (action.type) {
    case 'GUESS':
      return {
        ...state,
        guessNumber: state.guessNumber + 1,
        cursorPosition: 0,
      };
    case 'BACK':
      if (state.cursorPosition === 0) {
        return state;
      }
      boardCopy[state.guessNumber as keyof Board].letters[
        state.cursorPosition - 1
      ] = '';
      return {
        ...state,
        cursorPosition: state.cursorPosition - 1,
        board: boardCopy,
      };
    case 'TYPE':
      if (state.cursorPosition === 6) {
        return state;
      } else {
        boardCopy[state.guessNumber as keyof Board].letters[
          state.cursorPosition
        ] = action.key;

        return {
          ...state,
          cursorPosition: state.cursorPosition + 1,
          board: boardCopy,
        };
      }
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    word: 'LETTER',
    usedLetters: Array(26),
    guessNumber: 0,
    cursorPosition: 0,
    board: BlankBoard(),
  });

  const { word, usedLetters, guessNumber, cursorPosition, board } = state;

  const onBackspace = () => dispatch({ type: 'BACK' });
  const onOK = () => dispatch({ type: 'GUESS' });
  const onKeypress = (key: string) => dispatch({ type: 'TYPE', key });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordz</h1>
      </header>
      <GameBoard board={board} />
      <Keyboard onKeypress={onKeypress} onBackspace={onBackspace} onOK={onOK} />
    </div>
  );
}

export default App;
