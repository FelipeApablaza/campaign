CREATE DATABASE campaign;

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  gender VARCHAR(255),
  address VARCHAR(255),
);

CREATE DATABASE campaign;

CREATE TABLE "invitation" (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255),
  email VARCHAR(255),
  state VARCHAR(255),
);