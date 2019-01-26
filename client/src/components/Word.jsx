import React from 'react';

const Word = ({ id, value, isSelected }) => (
  <span id={id} style={isSelected ? { backgroundColor: 'yellow' } : {}}>{`${value} `}</span>
);

export default Word;
