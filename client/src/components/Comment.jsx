import React from 'react';
import { BlockMath } from 'react-katex';
import '../katex.min.css';

const renderBody = (body) => {
  const parts = body.split('$$');
  if (parts.length === 3) {
    const components = [];
    const [text1, equation, text2] = parts;
    if (text1.trim().length > 0) {
      components.push(<p>{text1}</p>);
    }
    components.push(<BlockMath>{equation}</BlockMath>);
    if (text2.trim().length > 0) {
      components.push(<p>{text2}</p>);
    }
    return components;
  }
  return <p>{body}</p>;
};

const Comment = ({ username, body, timestamp }) => (
  <div>
    <h4>{username}</h4>
    <time>{timestamp}</time>
    <div>{renderBody(body)}</div>
  </div>
);

export default Comment;
