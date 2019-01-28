import React, { Component } from 'react';
import Article from './components/Article';
import Sidebar from './components/Sidebar';

const inBetween = (x, rangeStart, rangeEnd) => x >= rangeStart && x <= rangeEnd;

const selectionOverlapsThread = (selectionStart, selectionEnd, threads) => (
  threads.some(thread => (
    inBetween(selectionStart, thread.start, thread.end)
    || inBetween(selectionEnd, thread.start, thread.end)
    || inBetween(thread.start, selectionStart, selectionEnd)
  ))
);

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
      currentThread: null,
    };

    this.getSelection = this.getSelection.bind(this);
    this.createThread = this.createThread.bind(this);
    this.getThread = this.getThread.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.clearCurrentThread = this.clearCurrentThread.bind(this);
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle() {
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
      const anchorId = Number(selection.anchorNode.parentElement.id);
      const focusId = Number(selection.focusNode.parentElement.id);
      const startId = Math.min(anchorId, focusId);
      const endId = Math.max(anchorId, focusId);
      const { threads } = this.state;
      if (!selectionOverlapsThread(startId, endId, threads)) {
        this.setState({
          selection: { startId, endId },
        });
      }
    } else {
      this.clearSelection();
    }
  }

  getThread(id) {
    const { threads } = this.state;
    const currentThread = threads.find(thread => thread._id === id);
    this.setState({ currentThread });
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
      body: JSON.stringify({ start: startId, end: endId }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Thread created!');
          this.getArticle();
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

  clearCurrentThread() {
    this.setState({ currentThread: null });
  }

  render() {
    const { title, words, selection, threads, currentThread } = this.state;
    return (
      <div>
        <Article
          title={title}
          words={words}
          threads={threads}
          getSelection={this.getSelection}
          getThread={this.getThread}
          clearCurrentThread={this.clearCurrentThread}
        />
        <Sidebar
          isSelecting={selection.startId !== null}
          createThread={this.createThread}
          currentThread={currentThread}
        />
      </div>
    );
  }
}

export default App;
