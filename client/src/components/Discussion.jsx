import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Discussion = ({ currentThread }) => {
  const { text, comments } = currentThread;
  return (
    <div>
      <h3>{text}</h3>
      <ul>
        {comments.map(({ id, username, body, timestamp }) => (
          <li key={id}><Comment username={username} body={body} timestamp={timestamp} /></li>
        ))}
      </ul>
      <CommentForm threadId={currentThread.id} />
    </div>
  );
};

export default Discussion;
