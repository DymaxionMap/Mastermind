import React, { Component } from 'react';
import Article from './components/Article';
import Discussion from './components/Discussion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      words: [],
      threads: [],
      selection: {
        startId: null,
        endId: null,
      },
    };

    this.getSelection = this.getSelection.bind(this);
    this.createThread = this.createThread.bind(this);
  }

  componentDidMount() {
    fetch('/articles/1')
      .then(response => response.json())
      .then((article) => {
        const { title, words, threads } = article;
        this.setState({ title, words, threads });
      });
  }

  getSelection() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      const startId = Number(selection.anchorNode.parentElement.id);
      const endId = Number(selection.focusNode.parentElement.id);
      this.setState({
        selection: {
          startId: Math.min(startId, endId),
          endId: Math.min(startId, endId),
        },
      });
    } else {
      this.clearSelection();
    }
  }

  clearSelection() {
    const { selection } = this.state;
    if (selection.startId !== null) {
      this.setState({
        selection: {
          startId: null,
          endId: null,
        },
      });
    }
  }

  createThread() {
    const { selection } = this.state;
    const { startId, endId } = selection;
    console.log(startId);
    console.log(endId);
    fetch('/articles/1/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startId, endId }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Thread created!');
        } else {
          console.log('Something went wrong...');
        }
        this.clearSelection();
      })
      .catch((err) => {
        console.error(err);
        this.clearSelection();
      });
  }

  render() {
    const { title, words, selection, threads } = this.state;
    return (
      <div>
        <Article
          title={title}
          words={words}
          threads={threads}
          getSelection={this.getSelection}
        />
        <Discussion isSelecting={selection.startId !== null} createThread={this.createThread} />
      </div>
    );
  }
}

export default App;
