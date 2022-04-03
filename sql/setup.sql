-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT,
    avatar TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    post VARCHAR(255)
);

INSERT INTO posts (username, post) VALUES ('Cool user', 'Cool Post') RETURNING *;
INSERT INTO posts (username, post) VALUES ('Cooler user', 'Cooler Post') RETURNING *;
INSERT INTO posts (username, post) VALUES ('Coolest user', 'Coolest Post') RETURNING *;
INSERT INTO posts (username, post) VALUES ('NotSoCool user', 'Not Really a Cool Post') RETURNING *;
INSERT INTO posts (username, post) VALUES ('DefNotCool user', 'Uncool Post') RETURNING *;