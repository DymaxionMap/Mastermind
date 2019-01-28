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
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/articles/:id/threads/:threadId/comments', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
