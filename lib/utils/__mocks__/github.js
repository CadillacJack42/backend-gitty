const codeExchange = async (code) => {
  console.log('codeExchange: Code exchanged for token');
  return `MOCKED TOKEN FOR CODE ${code}`;
};

const githubProfileData = async (token) => {
  console.log(`githubProfile return fake user data TOKEN : ${token}`);
  return {
    username: 'fake_github_user',
    avatar: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};

module.exports = { codeExchange, githubProfileData };
