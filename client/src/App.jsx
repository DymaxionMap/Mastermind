import React, { Component } from 'react';

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
      <div>
        <h2>
          Selected text:
          {selection.text}
        </h2>
        <h2>
          First node id:
          {selection.startId}
        </h2>
        <h2>
          Last node id:
          {selection.endId}
        </h2>
        <h1>{title}</h1>
        <div onMouseUp={this.getSelection}>
          {words.map(word => <span id={word.id} key={word.id}>{`${word.value} `}</span>)}
        </div>
      </div>
    );
  }
}

export default App;
