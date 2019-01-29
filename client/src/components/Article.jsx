import React from 'react';
import styled from 'styled-components';
import Word from './Word';
import Thread from './Thread';

const Container = styled.div`
  padding: 0.5rem 0;
`;

const Title = styled.h1`
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
`;

const Body = styled.p`
  font-size: 1.1rem;
`;

const renderWord = word => (
  <Word id={word.id} value={word.value} key={word.id} />
);

const renderText = (words, threads, getThread) => {
  const components = [];
  let i = 0;
  const threadsCopy = [...threads];
  threadsCopy.sort((a, b) => a.start - b.start);
  let thread;
  if (threadsCopy.length > 0) {
    thread = threadsCopy.shift();
  }
  while (i < words.length) {
    if (thread && i === thread.start) {
      components.push(
        <Thread id={thread._id} key={thread._id} getThread={getThread}>
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

const Article = ({ title, words, threads, getSelection, getThread, clearCurrentThread }) => (
  // TODO: Fix clearCurrentThread
  // <div onClick={clearCurrentThread}>
  <Container>
    <Title>{title}</Title>
    <Body onMouseUp={getSelection}>
      {renderText(words, threads, getThread)}
    </Body>
  </Container>
);

export default Article;
