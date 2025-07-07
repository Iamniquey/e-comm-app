const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "post740",
  database: "e_comm_db",
  host: "localhost",
  port: 5432,
});


// connection tester

// (async () => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     console.log(result.rows[0]);
//   } catch (err) {
//     console.error("Error executing query", err);
//   }
// })();

module.exports = {
  query: (text, params) => pool.query(text, params)
}