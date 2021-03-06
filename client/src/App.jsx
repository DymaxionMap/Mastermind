import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Article from './components/Article';
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  padding: 0 3rem;
  font-family: Garamond, Georgia, serif;
`;

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
    this.getArticle = this.getArticle.bind(this);
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle(cb = () => {}) {
    fetch('/articles/1')
      .then(response => response.json())
      .then((article) => {
        const { title, words, threads } = article;
        this.setState({ title, words, threads }, cb);
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
        if (response.status !== 201) {
          throw Error('Something went wrong...');
        }
        return response.json();
      })
      .then(({ newThreadId }) => {
        this.getArticle(() => {
          this.clearSelection();
          this.getThread(newThreadId);
        });
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
        <GlobalStyle />
        <Nav />
        <Container>
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
            getArticle={this.getArticle}
            getThread={this.getThread}
            clearCurrentThread={this.clearCurrentThread}
            clearSelection={this.clearSelection}
          />
        </Container>
      </div>
    );
  }
}

export default App;
