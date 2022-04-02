const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router().post('/', authenticate, async (req, res, next) => {
  try {
    const newPost = await Post.insert(req.body);
    console.log(newPost);
    res.json(newPost);
  } catch (error) {
    next(error);
  }
});