import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  min-height: 10rem;
  display: flex;
  align-items: center;
`;

const CreateThread = ({ createThread }) => (
  <Container>
    <Button id="startThread" type="button" onClick={createThread}>Create thread</Button>
  </Container>
);

export default CreateThread;
