const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, (req, res, next) => {
    Post.getAll()
      .then((posts) => res.send(posts))
      .catch((error) => next(error));
  })
  .post('/', authenticate, async (req, res, next) => {
    Post.insert(req.body)
      .then((newPost) => res.send(newPost))
      .catch((error) => next(error));
  });
