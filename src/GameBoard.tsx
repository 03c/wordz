import React from 'react';

import './GameBoard.css';

interface FuncProps {
  board: string[][];
}

const GameBoard: React.FC<FuncProps> = ({ board }) => {
  const flatBoard: string[] = board.flat();
  const squares = flatBoard.map((square, index) => {
    return <div key={index}>{square}</div>;
  });

  return (
    <div>
      <div className="grid-container">{squares}</div>
    </div>
  );
};

export default GameBoard;
