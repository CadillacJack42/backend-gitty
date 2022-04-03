const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('backend-gitty posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should allow an authenticated user to create a new post', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const newPost = {
      username: 'cadillacJack42',
      post: 'This is an awesome post',
    };
    const res = await agent.post('/api/v1/posts').send(newPost);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'cadillacJack42',
      post: 'This is an awesome post',
    });
  });

  it('Should display a list of all posts to authenticated users', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.get('/api/v1/posts');
    expect(res.body).toEqual([
      {
        id: '1',
        post: 'Cool Post',
        username: 'Cool user',
      },
      {
        id: '2',
        post: 'Cooler Post',
        username: 'Cooler user',
      },
      {
        id: '3',
        post: 'Coolest Post',
        username: 'Coolest user',
      },
      {
        id: '4',
        post: 'Not Really a Cool Post',
        username: 'NotSoCool user',
      },
      {
        id: '5',
        post: 'Uncool Post',
        username: 'DefNotCool user',
      },
    ]);
  });
});
