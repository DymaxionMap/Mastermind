const db = require('./index');

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat ante, blandit sit amet maximus vitae, elementum eu sem. Nulla volutpat ornare volutpat. Donec id ex vestibulum, scelerisque leo at, ullamcorper ligula. Duis sodales ex sed quam facilisis interdum. Integer sed fermentum orci. Vestibulum consequat justo ac orci gravida scelerisque. Ut accumsan facilisis purus quis vestibulum. Mauris luctus nisi tincidunt, finibus ligula eget, tempus purus. Nam libero nulla, mollis sit amet augue eget, tristique cursus massa. Etiam a dapibus justo.';
const words = text.split(/\s/);

const articles = [
  {
    urlId: '1',
    title: 'Lorem Ipsum',
    words: words.map((word, i) => ({ id: i, value: word })),
    threads: [
      {
        start: 0,
        end: 1,
        text: 'Lorem ipsum',
        comments: [
          {
            username: 'John Doe',
            body: 'Nunc quis diam scelerisque, commodo.',
            timestamp: '2019-01-26',
          },
          {
            username: 'Jane Doe',
            body: 'Donec sollicitudin luctus diam.',
            timestamp: '2019-01-27',
          },
        ],
      },
      {
        start: 5,
        end: 9,
        text: 'consectetur adipiscing elit. Sed erat',
        comments: [
          {
            username: 'Jane Doe',
            body: 'Morbi et congue justo. Fusce vitae.',
            timestamp: '2018-12-14',
          },
        ],
      },
    ],
  },
];

db.Article.insertMany(articles)
  .then(() => db.Article.find({}))
  .then(insertedArticles => console.log(insertedArticles));
