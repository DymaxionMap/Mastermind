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
  const { threads } = exampleData.articles[0];
  const currentThread = threads.find(thread => thread.id === Number(threadId));
  res.send(currentThread);
});

app.post('/articles/:id/threads', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

app.post('/articles/:id/threads/:threadId/comments', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
