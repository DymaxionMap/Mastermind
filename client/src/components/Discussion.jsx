import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Container = styled.div`
  width: 80%;
`;

const Text = styled.h3`
  font-style: italic;
  font-weight: normal;
  margin-bottom: 3rem;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const Discussion = ({ currentThread, getArticle, getThread, clearCurrentThread, clearSelection }) => {
  const { text, comments } = currentThread;
  return (
    <Container>
      <Text>{text}</Text>
      <CommentList>
        {comments.map(({ _id, username, body, timestamp }) => (
          <li key={_id}><Comment username={username} body={body} timestamp={timestamp} /></li>
        ))}
      </CommentList>
      <CommentForm threadId={currentThread._id} getArticle={getArticle} getThread={getThread} clearCurrentThread={clearCurrentThread} clearSelection={clearSelection} />
    </Container>
  );
};

export default Discussion;
