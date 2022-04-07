const fetch = require('cross-fetch');

const codeExchange = (code) => {
  const { access_token } = fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      }),
    }
  ).then((res) => res.json());

  return access_token;
};

const githubProfileData = (token) => {
  fetch('https://api.github.com/user', {
    headers: {
      authorization: `token ${token}`,
    },
  }).then((res) => res.json());
};

module.exports = { codeExchange, githubProfileData };
