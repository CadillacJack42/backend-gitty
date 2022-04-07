const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const { codeExchange, githubProfileData } = require('../utils/github');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', (req, res) => {
    const profileData = codeExchange(req.query.code)
      .then((token) => githubProfileData(token))
      .then((profile) => {
        return {
          username: profile.login ?? profile.username,
          email: profile.email,
          avatar: profile.avatar ?? profile.avatar_url,
        };
      });

    const user = GithubUser.findByUsername(profileData.username).catch(() =>
      GithubUser.insert(profileData)
    );

    const signedProfileData = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res
      .cookie(process.env.COOKIE_NAME, signedProfileData, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      })
      .redirect('/api/v1/posts');
  })

  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })

  .delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
      message: 'Signed out Successfully!',
    });
  });
