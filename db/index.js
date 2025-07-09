const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "post740",
  database: "e_comm_db",
  host: "localhost",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
}