import React from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GameBoard, { BlankBoard, Row } from './GameBoard';
import Keyboard from './Keyboard';

import './App.css';
import { start } from 'repl';

type State = {
  word: string; //TODO: get this from a list of words
  usedLetters: string[];
  correctIndexPositions: number[];
  correctIndexLetters: number[];
  guessNumber: number;
  cursorPosition: number;
  board: Array<Row>;
};

type Action =
  | { type: 'GUESS' }
  | { type: 'BACK' }
  | { type: 'TYPE'; key: string };

function reducer(state: State, action: Action): State {
  let boardCopy = [...state.board];
  let boardRowCopy = { ...boardCopy[state.guessNumber] };
  let lettersCopy = [...boardRowCopy.letters];
  switch (action.type) {
    case 'GUESS':
      //add letter to usedLetters
      let usedLettersCopy = Array.from(
        new Set([...state.usedLetters, ...boardRowCopy.letters])
      );

      //check correct position/letter
      let newCorrectPosition: number[] = [];
      let newCorrectLetters: number[] = [];
      for (let index = 0; index < 6; index++) {
        const guessLetter = boardRowCopy.letters[index];
        const wordLetter = state.word[index];
        if (guessLetter === wordLetter) {
          newCorrectPosition = [...newCorrectPosition, index];
        } else if (state.word.indexOf(guessLetter) !== -1) {
          newCorrectLetters = [...newCorrectLetters, index];
        }
      }

      //add letters to correctIndexLetters
      let newCorrectIndexPositions = Array.from(
        new Set([...state.correctIndexPositions, ...newCorrectPosition])
      );

      //add letters to correctIndexLetters
      let newCorrectIndexLetter = Array.from(
        new Set([...state.correctIndexLetters, ...newCorrectLetters])
      );

      boardRowCopy.correctIndexLetters = newCorrectLetters;
      boardRowCopy.correctIndexPositions = newCorrectPosition;

      boardCopy[state.guessNumber] = boardRowCopy;

      return {
        ...state,
        usedLetters: usedLettersCopy,
        correctIndexPositions: newCorrectIndexPositions,
        correctIndexLetters: newCorrectIndexLetter,
        guessNumber: state.guessNumber + 1,
        cursorPosition: 0,
        board: boardCopy,
      };
    case 'BACK':
      if (state.cursorPosition === 0) {
        toast('Already at the beginning!');
        return state;
      }
      lettersCopy[state.cursorPosition - 1] = '';
      boardCopy[state.guessNumber] = {
        ...boardCopy[state.guessNumber],
        letters: lettersCopy,
      };

      return {
        ...state,
        cursorPosition: state.cursorPosition - 1,
        board: boardCopy,
      };
    case 'TYPE':
      if (state.cursorPosition === 6) {
        toast('Already at the end!');
        return state;
      } else {
        lettersCopy[state.cursorPosition] = action.key;
        boardCopy[state.guessNumber] = {
          ...boardCopy[state.guessNumber],
          letters: lettersCopy,
        };
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
    usedLetters: [],
    correctIndexPositions: [],
    correctIndexLetters: [],
    guessNumber: 0,
    cursorPosition: 0,
    board: BlankBoard(),
  });

  const { word, correctIndexLetters, correctIndexPositions, board } = state;

  const onBackspace = () => dispatch({ type: 'BACK' });
  const onOK = () => dispatch({ type: 'GUESS' });
  const onKeypress = (key: string) => dispatch({ type: 'TYPE', key });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordz</h1>
      </header>
      <GameBoard board={board} />
      <Keyboard
        onKeypress={onKeypress}
        onBackspace={onBackspace}
        onOK={onOK}
        word={state.word}
        correctIndexLetters={correctIndexLetters}
        correctIndexPositions={correctIndexPositions}
      />
      <ToastContainer
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss={false}
        theme="dark"
        draggable={false}
        hideProgressBar={true}
        transition={Zoom}
      />
    </div>
  );
}

export default App;
