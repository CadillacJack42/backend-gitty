const { transformFileSync } = require('@babel/core');
const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      const response = await posts.map((post) => new Post(post));
    } catch (error) {
      next(error);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newPost = await Post.insert(req.body);
      console.log(newPost);
      res.json(newPost);
    } catch (error) {
      next(error);
    }
  });
