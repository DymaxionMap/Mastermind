import React from 'react';
import Word from './Word';

const Article = ({ title, words, getSelection }) => (
  <div>
    <h1>{title}</h1>
    <p onMouseUp={getSelection}>
      {words.map(word => (
        <Word id={word.id} value={word.value} key={word.id} />
      ))}
    </p>
  </div>
);

export default Article;
