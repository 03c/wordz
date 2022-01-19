import React from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GameBoard, { BlankBoard, Row } from './GameBoard';
import Keyboard from './Keyboard';
import EndGame from './EndGame';
import './App.css';

type State = {
  word: string; //TODO: get this from a list of words
  wordNumber: number;
  usedLetters: string[];
  correctIndexPositions: number[];
  correctIndexLetters: number[];
  guessNumber: number;
  cursorPosition: number;
  board: Array<Row>;
  win: boolean;
  lose: boolean;
  gamesWon: number;
  gamesLost: number;
};

type Action =
  | { type: 'GUESS' }
  | { type: 'BACK' }
  | { type: 'TYPE'; key: string }
  | { type: 'NEW_WORD'; word: string }
  | { type: 'NEXT_WORD' };

const InitialState: State = {
  word: '',
  wordNumber: 0,
  usedLetters: [],
  correctIndexPositions: [],
  correctIndexLetters: [],
  guessNumber: 0,
  cursorPosition: 0,
  board: BlankBoard(),
  win: false,
  lose: false,
  gamesWon: 0,
  gamesLost: 0,
};

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
          newCorrectLetters = [
            ...newCorrectLetters,
            state.word.indexOf(guessLetter),
          ];
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
        win: newCorrectPosition.length === 6,
        lose: state.guessNumber + 1 === 6 && newCorrectPosition.length !== 6,
        gamesWon: state.gamesWon + (newCorrectPosition.length === 6 ? 1 : 0),
        gamesLost:
          state.gamesLost +
          (state.guessNumber + 1 === 6 && newCorrectPosition.length !== 6
            ? 1
            : 0),
      };
    case 'BACK':
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
    case 'NEW_WORD':
      return {
        ...state,
        word: action.word,
      };
    case 'NEXT_WORD':
      return {
        ...InitialState,
        gamesWon: state.gamesWon,
        gamesLost: state.gamesLost,
        wordNumber: state.wordNumber + 1,
      };
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    localStorage.getItem('wordz-game')
      ? JSON.parse(localStorage.getItem('wordz-game') ?? '')
      : { ...InitialState }
  );

  React.useEffect(() => {
    localStorage.setItem('wordz-game', JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    if (state.word === '') {
      fetch('/words.txt')
        .then((r) => r.text())
        .then((text) => {
          let lines = text.split('\n');
          dispatch({ type: 'NEW_WORD', word: lines[state.wordNumber] });
        });
    }
  }, [state.word, state.wordNumber]);

  const {
    word,
    win,
    lose,
    gamesWon,
    gamesLost,
    correctIndexLetters,
    correctIndexPositions,
    board,
  } = state;

  const onNextWord = () => dispatch({ type: 'NEXT_WORD' });
  const onBackspace = () => {
    if (state.win) return;
    if (state.cursorPosition === 0) {
      toast('Already at the beginning!', { type: 'error' });
      return;
    }
    dispatch({ type: 'BACK' });
  };
  const onOK = () => {
    if (state.win) return;
    if (state.cursorPosition !== 6) {
      toast('Not enough letters!', { type: 'error' });
      return;
    }
    dispatch({ type: 'GUESS' });
  };
  const onKeypress = (key: string) => {
    if (state.win) return;
    if (state.cursorPosition === 6) {
      toast('Already at the end!', { type: 'error' });
      return;
    }
    dispatch({ type: 'TYPE', key });
  };

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
        word={word}
        correctIndexLetters={correctIndexLetters}
        correctIndexPositions={correctIndexPositions}
        usedLetters={state.usedLetters}
      />
      <EndGame
        word={word}
        win={win}
        lose={lose}
        gamesWon={gamesWon}
        gamesLost={gamesLost}
        onNextWord={onNextWord}
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
