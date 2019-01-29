/* eslint react/self-closing-comp: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  border-top: thin solid gray;
  padding-top: 2rem;
`;

const Label = styled.label`
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  max-width: 10rem;
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 0.9rem;
  padding: 0.5rem;
  border: thin solid gray;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 0.9rem;
  border: thin solid gray;
  border-radius: 0.2rem;
  padding: 0.5rem;
  min-height: 6rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem;
  border: thin solid gray;
  border-radius: 0.2rem;
  max-width: 6rem;

  &:hover {
    color: white;
    background-color: black;
  }
`;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      body: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  changeHandler(event, field) {
    this.setState({ [field]: event.target.value });
  }

  clickHandler(threadId) {
    const { username, body } = this.state;
    const { getArticle, getThread, clearCurrentThread, clearSelection } = this.props;
    fetch(`/articles/1/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        body,
        timestamp: (new Date()).toISOString(),
      }),
    })
      .then((request) => {
        if (request.status !== 201) {
          throw Error('Something bad happened...');
        }
        console.log('Created comment!');
        return request.json();
      })
      .then(({ modifiedThreadId }) => {
        getArticle(() => {
          clearSelection();
          clearCurrentThread();
          getThread(modifiedThreadId);
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { threadId } = this.props;
    return (
      <Form>
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" onChange={e => this.changeHandler(e, 'username')} data-lpignore="true" />
        <Label htmlFor="body">Comment</Label>
        <TextArea id="body" onChange={e => this.changeHandler(e, 'body')}></TextArea>
        <Button type="button" onClick={() => this.clickHandler(threadId)}>Submit</Button>
      </Form>
    );
  }
}

export default CommentForm;
