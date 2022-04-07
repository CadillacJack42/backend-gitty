const { fetch } = require('cross-fetch');

module.exports = class Quote {
  author;
  content;

  constructor(row) {
    this.author = row.author;
    this.content = row.content;
  }

  //   static async getQuotes() {
  //     const quotesArray = [];
  //     const first = await fetch('https://quotes.rest/qod?language=en');
  //     const firstQuote = await first.json();

  //     console.log('FIRST : ', firstQuote.contents);
  //   }

  static getQuotes() {
    const quotesArray = [];

    return fetch('https://quotes.rest/qod?language=en')
      .then((res) => res.json())
      .then((quote) => quotesArray.push(quote));
  }
};
