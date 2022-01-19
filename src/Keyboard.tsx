import React from 'react';

import './Keyboard.css';

interface FuncProps {
  onKeypress: (key: string) => void;
  onBackspace: () => void;
  onOK: () => void;
  word: string;
  correctIndexLetters: number[];
  correctIndexPositions: number[];
  usedLetters: string[];
}

const Keyboard: React.FC<FuncProps> = ({
  onKeypress,
  onBackspace,
  onOK,
  word,
  correctIndexLetters,
  correctIndexPositions,
  usedLetters,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onKeypress(event.currentTarget.innerText);
  };

  const correctLettersPosition = correctIndexPositions.map((index) => {
    return word[index];
  });
  const correctLetters = correctIndexLetters.map((index) => {
    return word[index];
  });

  const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
    (letter) => {
      return (
        <div
          className={
            correctLettersPosition.includes(letter)
              ? 'green'
              : correctLetters.includes(letter)
              ? 'yellow'
              : usedLetters.includes(letter)
              ? 'faded'
              : ''
          }
          onClick={handleClick}
          key={letter}
        >
          {letter}
        </div>
      );
    }
  );

  const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(
    (letter) => {
      return (
        <div
          className={
            correctLettersPosition.includes(letter)
              ? 'green'
              : correctLetters.includes(letter)
              ? 'yellow'
              : usedLetters.includes(letter)
              ? 'faded'
              : ''
          }
          onClick={handleClick}
          key={letter}
        >
          {letter}
        </div>
      );
    }
  );

  const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => {
    return (
      <div
        className={
          correctLettersPosition.includes(letter)
            ? 'green'
            : correctLetters.includes(letter)
            ? 'yellow'
            : usedLetters.includes(letter)
            ? 'faded'
            : ''
        }
        onClick={handleClick}
        key={letter}
      >
        {letter}
      </div>
    );
  });

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">{firstRow}</div>
      <div className="keyboard-row">{secondRow}</div>
      <div className="keyboard-row">
        <div onClick={onOK}>OK</div>
        {thirdRow}
        <div onClick={onBackspace}>{'<<'}</div>
      </div>
    </div>
  );
};

export default Keyboard;
