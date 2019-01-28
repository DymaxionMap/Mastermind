import React from 'react';
import Comment from './Comment';

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
    </div>
  );
};

export default Discussion;
