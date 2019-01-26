import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      words: [],
      highlighted: '',
    };

    this.getHighlighted = this.getHighlighted.bind(this);
  }

  componentDidMount() {
    fetch('/articles/1')
      .then(data => data.json())
      .then((article) => {
        const { title, words } = article;
        this.setState({ title, words });
      });
  }

  getHighlighted() {
    const selection = window.getSelection();
    this.setState({ highlighted: selection.toString() });
  }

  render() {
    const { title, words, highlighted } = this.state;
    return (
      <div>
        <h2>{highlighted}</h2>
        <h1>{title}</h1>
        <div onMouseUp={this.getHighlighted}>{words.map((word, i) => <span key={i}>{`${word} `}</span>)}</div>
      </div>
    );
  }
}

export default App;
