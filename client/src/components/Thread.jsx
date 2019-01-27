import React from 'react';

const Thread = ({ id, getThread, children }) => (
  <a href="#" onClick={() => getThread(id)}>
    {children}
  </a>
);

export default Thread;
