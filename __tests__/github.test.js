const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('backend-gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should redirect to gihub Oauth page for login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('Should redirect users to dashboard after login', async () => {
    const agent = request.agent(app);
    const res = await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.req.path).toMatch('/api/v1/posts');

    expect(res.body).toEqual([
      { id: '1', post: 'Cool Post', username: 'Cool user' },
      { id: '2', post: 'Cooler Post', username: 'Cooler user' },
      { id: '3', post: 'Coolest Post', username: 'Coolest user' },
      { id: '4', post: 'Not Really a Cool Post', username: 'NotSoCool user' },
      { id: '5', post: 'Uncool Post', username: 'DefNotCool user' },
    ]);
  });

  it('Should remove a users cookie upon sign out', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const res = await agent.delete('/api/v1/github');

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out Successfully!',
    });
    expect(res.status).toEqual(200);
  });
});
// Minor change for push

// {"header": {"connection": "close",
//  "content-length": "154",
//  "content-type": "application/json;
//  charset=utf-8", "date": "Wed, 06 Apr 2022 19:44:50 GMT",
//  "etag": "W/\"9a-39ikh22R4T42Snx4HQzWphfTjGI\"", "x-powered-by": "Express"},
//  "req": {"data": null, "headers": {"accept-encoding": "gzip, deflate"},
//  "method": "GET",
//  "url": "http://127.0.0.1:62015/api/v1/github/dashboard"},
//  "status": 200,
//  "text": "{\"id\":\"1\",\"username\":\"fake_github_user\",\"email\":\"not-real@example.com\",\"avatar\":\"https://www.placecage.com/gif/300/300\",\"iat\":1649274290,\"exp\":1649360690}"}
