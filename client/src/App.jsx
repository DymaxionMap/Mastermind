import React, { Component } from 'react';
import Article from './components/Article';

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
  }

  componentDidMount() {
    fetch('/articles/1')
      .then(data => data.json())
      .then((article) => {
        const { title, words } = article;
        this.setState({
          title,
          words: words.map(word => Object.assign({ isSelected: false }, word)),
        });
      });
  }

  getSelection() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      const { words } = this.state;
      const startId = Number(selection.anchorNode.parentElement.id);
      const endId = Number(selection.focusNode.parentElement.id);
      const highlightedWords = words.map(word => (
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
        words: highlightedWords,
      });
    }
  }

  render() {
    const { title, words, selection } = this.state;
    return (
      <Article title={title} words={words} selection={selection} getSelection={this.getSelection} />
    );
  }
}

export default App;
