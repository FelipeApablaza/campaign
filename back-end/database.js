const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

async function createTables() {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS "user" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      gender VARCHAR(255),
      address VARCHAR(255)
    )`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS "invitation" (
          id SERIAL PRIMARY KEY,
          key VARCHAR(255),
          email VARCHAR(255),
          state VARCHAR(255)
      )`
    );
  } catch (err) {
    throw err;
  } finally {
    pool.query(
      `INSERT INTO "user" (name, email, gender, address) VALUES ('leonardo', 'leonardo@currencybird.cl', 'male', 'leonardo_address')`
    );
  }
}

createTables();

module.exports = pool;
