const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-gitty posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should allow an authenticated user to create a new post', async () => {
    const newPost = {
      username: 'cadillacJack42',
      post: 'This is an awesome post',
    };
    const res = await request(app).post('/api/v1/posts').send(newPost);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'cadillacJack42',
      post: 'This is an awesome post',
    });
  });
});
