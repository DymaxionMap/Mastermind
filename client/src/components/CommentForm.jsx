import React, { Component } from 'react';

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
      <form>
        <label htmlFor="username">
          Username
          <input id="username" type="text" onChange={e => this.changeHandler(e, 'username')} />
        </label>
        <label htmlFor="body">
          Comment
          <input id="body" type="textarea" onChange={e => this.changeHandler(e, 'body')} />
        </label>
        <button type="button" onClick={() => this.clickHandler(threadId)}>Submit</button>
      </form>
    );
  }
}

export default CommentForm;
