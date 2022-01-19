import React from 'react';

import './EndGame.css';

interface FuncProps {
  word: string;
  win: boolean;
  lose: boolean;
  gamesWon: number;
  gamesLost: number;
  onNextWord: () => void;
}

const EndGame: React.FC<FuncProps> = ({
  word,
  win,
  lose,
  gamesWon,
  gamesLost,
  onNextWord,
}) => {
  if (!win && !lose) return null;
  return (
    <div className={win ? 'end-game win' : 'end-game lose'}>
      <h1>You have {win ? 'won!' : 'lost!'}</h1>
      <h2>The word was: {word}</h2>
      <div>
        <h2>Game Stats</h2>
        <p>Games Won: {gamesWon}</p>
        <p>Games Lost: {gamesLost}</p>
        <p>Win Percengate: {(gamesWon / (gamesWon + gamesLost)) * 100}%</p>
      </div>
      <p className="next" onClick={onNextWord}>
        Play again?
      </p>
    </div>
  );
};

export default EndGame;
