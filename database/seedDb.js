const db = require('./index');

const text = 'Lorem ipsum dolor sit amet, sed ad inani evertitur, alia meis solum sea te. Has dicta legere no, omnes sapientem te ius. Sale scripta mandamus ei pri, sit cu commodo molestie posidonium, eu nam tritani recusabo. Mea dicat solet complectitur in, quaeque maiorum complectitur has et, inermis instructior in cum. Cu hinc consul eum, propriae rationibus cu mel. Prompta albucius offendit pri no, est id paulo placerat. No cum commune explicari. At eum nostro fabulas, denique conceptam ex mea. Et mea omnium prompta, mea no postea accusamus interesset, ad albucius persequeris dissentiunt quo. Eam ad animal blandit definiebas. Sed et feugait vivendo.Enim iuvaret cum an. Nam fabulas scaevola convenire te, saepe liberavisse mea an, est hinc aliquam dissentiet ut. Eu iriure probatus voluptatibus cum. Minimum intellegebat in ius, qui ut ridens lucilius eleifend. Qui solum mentitum ne, eu pro vidisse albucius. Ne qui expetenda dissentiunt, populo labitur definiebas nam ne, vel alienum pericula cu. Te sit verterem maiestatis, vel.';
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
          {
            username: 'Stephen',
            body: 'Einstein figured this out: $$ E=mc^2 $$',
            timestamp: '2019-01-28',
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
          {
            username: 'Stephen',
            body: '$$ \\int_0^\\infty x^2 dx $$ Integrals are cool.',
            timestamp: '2019-01-28',
          },
        ],
      },
    ],
  },
];

db.Article.deleteMany({})
  .then(() => db.Article.find({}))
  .then(data => console.log(data))
  .then(() => db.Article.insertMany(articles))
  .then(() => db.Article.find({}))
  .then(insertedArticles => console.log(insertedArticles))
  .then(() => db.close());
