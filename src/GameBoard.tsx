import { type } from 'os';
import React from 'react';

import './GameBoard.css';

type Row = {
  letters: string[];
  correctPosition: number[];
  correctLetter: number[];
  checked: boolean;
};

type Board = {
  0: Row;
  1: Row;
  2: Row;
  3: Row;
  4: Row;
  5: Row;
};

interface FuncProps {
  board: Board;
}

const BlankBoard = (): Board => {
  return {
    0: BlankRow(),
    1: BlankRow(),
    2: BlankRow(),
    3: BlankRow(),
    4: BlankRow(),
    5: BlankRow(),
  }
};

const BlankRow = (): Row => {
  return {
    letters: Array(6).fill(''),
    correctPosition: Array(6),
    correctLetter: Array(6),
    checked: false,
  };
};

const GameBoard: React.FC<FuncProps> = ({ board }) => {
  const flatBoard: string[] = [
    ...board[0].letters,
    ...board[1].letters,
    ...board[2].letters,
    ...board[3].letters,
    ...board[4].letters,
    ...board[5].letters,
  ];
  const squares = flatBoard.map((square, index) => {
    return <div key={index}>{square}</div>;
  });

  return (
    <div className="game-board">
      <div className="grid-container">{squares}</div>
    </div>
  );
};

export default GameBoard;
export { BlankBoard }
export type { Board, Row };
