import React, { Component } from 'react';
import Article from './components/Article';
import Discussion from './components/Discussion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      words: [],
      selection: {
        text: '',
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
        const { title, words } = article;
        this.setState({
          title,
          words: words.map(word => Object.assign(
            {
              isSelected: false,
              threadId: null,
            },
            word,
          )),
        });
      });
  }

  getSelection() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      const { words } = this.state;
      const startId = Number(selection.anchorNode.parentElement.id);
      const endId = Number(selection.focusNode.parentElement.id);
      const wordsWithSelection = words.map(word => (
        (word.id >= startId && word.id <= endId)
          ? { ...word, isSelected: true }
          : { ...word }
      ));
      this.setState({
        selection: {
          startId,
          endId,
          text: selection.toString(),
        },
        words: wordsWithSelection,
      });
    } else {
      this.clearSelection();
    }
  }

  clearSelection() {
    this.setState({
      selection: {
        startId: null,
        endId: null,
        text: '',
      },
    });
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
    const { title, words, selection } = this.state;
    return (
      <div>
        <Article
          title={title}
          words={words}
          selection={selection}
          getSelection={this.getSelection}
        />
        <Discussion isSelecting={selection.startId !== null} createThread={this.createThread} />
      </div>
    );
  }
}

export default App;
