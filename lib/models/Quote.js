const fetch = require('cross-fetch');

module.exports = class Quote {
  author;
  content;

  constructor(row) {
    this.author = row.author;
    this.content = row.content;
  }

  static getQuotes() {
    const links = [
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://api.quotable.io/random',
    ];

    const quotesArray = Promise.all(links.map((link) => fetch(link)))
      .then((quotes) => Promise.all(quotes.map((quote) => quote.json())))
      .then((readableQuotes) => {
        return [
          {
            author: readableQuotes[0][0].character,
            quote: readableQuotes[0][0].quote,
          },
          {
            author: readableQuotes[1].author,
            quote: readableQuotes[1].en,
          },
          {
            author: readableQuotes[2].author,
            quote: readableQuotes[2].content,
          },
        ];
      });
    return quotesArray;
  }
};
