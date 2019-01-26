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

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
