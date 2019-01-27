const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exampleData = require('../database/exampleData');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(bodyParser.json());

app.get('/articles/:id', (req, res) => {
  res.send(exampleData.articles[0]);
});

app.get('/articles/:id/threads/:threadId', (req, res) => {
  const { threadId } = req.params;
  console.log(exampleData.articles[0].threads[0]);
  res.send(exampleData.articles[0].threads[0]);
});

app.post('/articles/:id/threads', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
