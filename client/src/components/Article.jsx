import React from 'react';
import Word from './Word';
import Thread from './Thread';

const renderWord = word => (
  <Word id={word.id} value={word.value} key={word.id} />
);

const renderText = (words, threads) => {
  const components = [];
  let i = 0;
  const threadsCopy = [...threads];
  let thread;
  if (threadsCopy.length > 0) {
    thread = threadsCopy.shift();
  }
  while (i < words.length) {
    if (thread && i === thread.start) {
      components.push(
        <Thread id={thread.id}>
          {words.slice(i, i + thread.end - thread.start + 1).map(renderWord)}
        </Thread>,
      );
      i += thread.end - thread.start + 1;
      if (threadsCopy.length > 0) {
        thread = threadsCopy.shift();
      }
    } else {
      components.push(renderWord(words[i]));
      i += 1;
    }
  }
  return components;
};

const Article = ({ title, words, threads, getSelection }) => (
  <div>
    <h1>{title}</h1>
    <p onMouseUp={getSelection}>
      {renderText(words, threads)}
    </p>
  </div>
);

export default Article;
