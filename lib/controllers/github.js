const { Router } = require('express');
const { codeExchange, githubProfileData } = require('../utils/github');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
      );
    } catch (error) {
      next(error);
    }
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const token = await codeExchange(req.query.code);
      const profile = await githubProfileData(token);
      console.log(profile);
    } catch (error) {
      next(error);
    }
  });
