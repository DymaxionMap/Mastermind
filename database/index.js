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
      return Article.findByIdAndUpdate(article._id,
        { $push: { threads: thread } },
        { new: true });
    })
);

module.exports = {
  Article,
  getArticle,
  getAllArticles,
  addThread,
};
