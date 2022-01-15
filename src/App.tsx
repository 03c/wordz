import React from 'react';

import GameBoard from './GameBoard';
import Keyboard from './Keyboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordz</h1>
      </header>
      <GameBoard />
      <Keyboard />
    </div>
  );
}

export default App;
