import React from 'react';

const Comment = ({ username, body, timestamp }) => (
  <div>
    <h4>{username}</h4>
    <time>{timestamp}</time>
    <p>{body}</p>
  </div>
);

export default Comment;
