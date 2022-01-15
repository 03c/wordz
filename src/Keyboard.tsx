import React from 'react';

import './Keyboard.css';

const Key: React.FC<{}> = ({ children }) => {
  function onClick() {
    console.log(children);
  }
  return <div onClick={onClick}>{children}</div>;
};

export default function Keyboard() {
  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
      <Key>Q</Key>
      <Key>W</Key>
      <Key>E</Key>
      <Key>R</Key>
      <Key>T</Key>
      <Key>Y</Key>
      <Key>U</Key>
      <Key>I</Key>
      <Key>O</Key>
      <Key>P</Key>
      </div>
      <div className="keyboard-row">
      <Key>A</Key>
      <Key>S</Key>
      <Key>D</Key>
      <Key>F</Key>
      <Key>G</Key>
      <Key>H</Key>
      <Key>J</Key>
      <Key>K</Key>
      <Key>L</Key>
      </div>
      <div className="keyboard-row">
      <Key>OK</Key>
      <Key>Z</Key>
      <Key>X</Key>
      <Key>C</Key>
      <Key>V</Key>
      <Key>B</Key>
      <Key>N</Key>
      <Key>M</Key>
      <Key>{'<<'}</Key>
      </div>
    </div>
  );
}
