const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(bodyParser.json());

app.get('/articles/:id', (req, res) => {
  const urlId = req.params.id;
  db.getArticle(urlId)
    .then(article => res.send(article));
});

app.post('/articles/:id/threads', (req, res) => {
  const urlId = req.params.id;
  const { start, end } = req.body;
  db.addThread(urlId, start, end)
    .then((newThreadId) => {
      res.status(201).send({ newThreadId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/articles/:id/threads/:threadId/comments', (req, res) => {
  const { id: urlId, threadId } = req.params;
  const { username, body, timestamp } = req.body;
  db.addComment(urlId, threadId, username, body, timestamp)
    .then(modifiedThreadId => res.status(201).send({ modifiedThreadId }))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
