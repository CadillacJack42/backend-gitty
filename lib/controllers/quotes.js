const { Router } = require('express');
const Quote = require('../models/Quote');

module.exports = Router().get('/', (req, res, next) => {
  Quote.getQuotes()
    .then((quotes) => res.send(quotes))
    .catch((error) => next(error));
});
