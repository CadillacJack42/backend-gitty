const pool = require('../utils/pool');

module.exports = class Post {
  id;
  username;
  post;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.post = row.post;
  }

  static insert({ username, post }) {
    return pool
      .query(
        `
      INSERT INTO posts (username, post) VALUES ($1, $2) RETURNING *
      `,
        [username, post]
      )
      .then(({ rows }) => new Post(rows[0]));
  }

  static getAll() {
    return pool
      .query(
        `
      SELECT * FROM posts
      `
      )
      .then(({ rows }) => rows.map((row) => new Post(row)));
  }
};
