import React from 'react';

import './Keyboard.css';

interface FuncProps {
  onKeypress: (key: string) => void;
}

const Keyboard: React.FC<FuncProps> = ({ onKeypress }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onKeypress(event.currentTarget.innerText);
  };
  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        <div onClick={handleClick}>Q</div>
        <div onClick={handleClick}>W</div>
        <div onClick={handleClick}>E</div>
        <div onClick={handleClick}>R</div>
        <div onClick={handleClick}>T</div>
        <div onClick={handleClick}>Y</div>
        <div onClick={handleClick}>U</div>
        <div onClick={handleClick}>I</div>
        <div onClick={handleClick}>O</div>
        <div onClick={handleClick}>P</div>
      </div>
      <div className="keyboard-row">
        <div onClick={handleClick}>A</div>
        <div onClick={handleClick}>S</div>
        <div onClick={handleClick}>D</div>
        <div onClick={handleClick}>F</div>
        <div onClick={handleClick}>G</div>
        <div onClick={handleClick}>H</div>
        <div onClick={handleClick}>J</div>
        <div onClick={handleClick}>K</div>
        <div onClick={handleClick}>L</div>
      </div>
      <div className="keyboard-row">
        <div onClick={handleClick}>OK</div>
        <div onClick={handleClick}>Z</div>
        <div onClick={handleClick}>X</div>
        <div onClick={handleClick}>C</div>
        <div onClick={handleClick}>V</div>
        <div onClick={handleClick}>B</div>
        <div onClick={handleClick}>N</div>
        <div onClick={handleClick}>M</div>
        <div onClick={handleClick}>{'<<'}</div>
      </div>
    </div>
  );
};

export default Keyboard;
