import React from 'react';

import './GameBoard.css';

type Row = {
  letters: string[];
  correctIndexPositions: number[];
  correctIndexLetters: number[];
};

interface FuncProps {
  board: Array<Row>;
}

const BlankBoard = (): Array<Row> => {
  return new Array(6).fill(BlankRow());
};

const BlankRow = (): Row => {
  return {
    letters: Array(6).fill(''),
    correctIndexPositions: Array(6),
    correctIndexLetters: Array(6),
  };
};

const GameBoard: React.FC<FuncProps> = ({ board }) => {
  const row = board.map((row) => {
    const letters = row.letters.map((letter, index) => {
      let className = row.correctIndexPositions.includes(index)
        ? 'green'
        : row.correctIndexLetters.includes(index)
        ? 'yellow'
        : '';
      return (
        <div className={className} key={index}>
          {letter}
        </div>
      );
    });

    return letters;
  });

  return (
    <div className="game-board">
      <div className="grid-container">{row}</div>
    </div>
  );
};

export default GameBoard;
export { BlankBoard, BlankRow };
export type { Row };
