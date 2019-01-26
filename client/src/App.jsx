import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      words: [],
    };
  }

  componentDidMount() {
    fetch('/articles/1')
      .then(data => data.json())
      .then((article) => {
        const { title, words } = article;
        this.setState({ title, words });
      });
  }

  render() {
    const { title, words, highlighted } = this.state;
    return (
      <div>
        <h2>{highlighted}</h2>
        <h1>{title}</h1>
        <p>{words.map((word, i) => <span key={i}>{`${word} `}</span>)}</p>
      </div>
    );
  }
}

export default App;
