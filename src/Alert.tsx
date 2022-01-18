import React from 'react';

import './Alert.css';

interface FuncProps {}

const Alert: React.FC<FuncProps> = ({ children }) => {
  //return null if no message
  if (children === '') {
    return null;
  }
  return (
    <div className="alert">
      <h1>{children}</h1>
    </div>
  );
};

export default Alert;
