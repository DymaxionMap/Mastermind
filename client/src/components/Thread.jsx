import React from 'react';
import styled from 'styled-components';

const StyledThread = styled.a`
  text-decoration: none;
  background-color: #dddddd;
  color: black;
  cursor: pointer;

  &:visited {
    color: inherit;
  }

  &:hover {
    background-color: yellow;
  }
`;

const Thread = ({ id, getThread, children }) => (
  <StyledThread onClick={() => getThread(id)}>
    {children}
  </StyledThread>
);

export default Thread;
