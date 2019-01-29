import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { BlockMath } from 'react-katex';
import '../katex.min.css';

const Container = styled.div`
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Username = styled.h4`
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 1rem;
  margin: 0;
`;

const Time = styled.time`
  color: gray;
  font-size: 0.9rem;
`;

const Body = styled.div`
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const renderBody = (body) => {
  const parts = body.split('$$');
  if (parts.length === 3) {
    const components = [];
    const [text1, equation, text2] = parts;
    if (text1.trim().length > 0) {
      components.push(<Paragraph>{text1}</Paragraph>);
    }
    components.push(<BlockMath>{equation}</BlockMath>);
    if (text2.trim().length > 0) {
      components.push(<Paragraph>{text2}</Paragraph>);
    }
    return components;
  }
  return <Paragraph>{body}</Paragraph>;
};

const Comment = ({ username, body, timestamp }) => (
  <Container>
    <Header>
      <Username>{username}</Username>
      <Time>{moment(timestamp).fromNow()}</Time>
    </Header>
    <Body>{renderBody(body)}</Body>
  </Container>
);

export default Comment;
