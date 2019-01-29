const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const uri = process.env.MONGODB_URI || 'mongodb://localhost/mastermind';
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const ArticleSchema = new mongoose.Schema({
  urlId: String,
  title: String,
  words: [{
    id: Number,
    value: String,
  }],
  threads: [{
    start: Number,
    end: Number,
    text: String,
    comments: [{
      username: String,
      body: String,
      timestamp: Date,
    }],
  }],
});

const Article = mongoose.model('Article', ArticleSchema);

const getArticle = urlId => Article.findOne({ urlId });
const getAllArticles = () => Article.find({});

const addThread = (urlId, start, end) => (
  getArticle(urlId)
    .then((article) => {
      const { words } = article;
      const text = words.slice(start, end + 1).map(word => word.value).join(' ');
      const thread = {
        start,
        end,
        text,
        comments: [],
      };
      article.threads.push(thread);
      return article.save();
    })
    .then((article) => {
      const newThreadId = article.threads.slice(-1)._id;
      return newThreadId;
    })
);

const addComment = (urlId, threadId, username, body, timestamp) => (
  getArticle(urlId)
    .then((article) => {
      const thread = article.threads.id(threadId);
      const { comments } = thread;
      comments.push({ username, body, timestamp });
      return article.save();
    })
    .then((article) => {
      const idModifiedThread = article.threads.slice(-1)._id;
      return idModifiedThread;
    })
);

module.exports = {
  Article,
  getArticle,
  getAllArticles,
  addThread,
  addComment,
};
