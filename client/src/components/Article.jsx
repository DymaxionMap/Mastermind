import React from 'react';
import Word from './Word';

const Article = ({ title, words, selection, getSelection }) => (
  <div>
    <h2>
      Selected text:
      {selection.text}
    </h2>
    <h2>
      First node id:
      {selection.startId}
    </h2>
    <h2>
      Last node id:
      {selection.endId}
    </h2>
    <h1>{title}</h1>
    <p onMouseUp={getSelection}>
      {words.map(word => <Word id={word.id} value={word.value} key={word.id} />)}
    </p>
  </div>
);

export default Article;
