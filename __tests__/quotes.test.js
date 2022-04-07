const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-gitty quotes route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end;
  });

  it('Should return an array of quote objects', async () => {
    const res = await request.agent('/api/v1/quotes');

    expect(res.body).toEqual([
      {
        author: 'Aldous Huxley',
        content: 'Something he said',
      },
    ]);
  });
});
