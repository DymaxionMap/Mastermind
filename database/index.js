const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/mastermind', { useNewUrlParser: true });
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
  }],
});

const ThreadSchema = new mongoose.Schema({
  text: String,
  comments: [{
    username: String,
    body: String,
    timestamp: Date,
  }],
});

const Article = mongoose.model('Article', ArticleSchema);
const Thread = mongoose.model('Thread', ThreadSchema);

const getArticle = urlId => Article.findOne({ urlId });
const getAllArticles = () => Article.find({});

const getThread = id => Thread.findById(id);
const getAllThreads = () => Thread.find({});

module.exports = {
  Article,
  Thread,
  getArticle,
  getThread,
  getAllArticles,
  getAllThreads,
};
