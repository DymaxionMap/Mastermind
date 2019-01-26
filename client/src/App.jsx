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
        this.setState({ title, words });
      });
  }

  getSelection() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      console.log('Anchor node:');
      console.log(selection.anchorNode.parentElement);
      console.log('Focus node:');
      console.log(selection.focusNode.parentElement);
      this.setState({ selection: {
        text: selection.toString(),
        startId: selection.anchorNode.parentElement.id,
        endId: selection.focusNode.parentElement.id,
      } });
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
