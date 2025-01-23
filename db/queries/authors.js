const pool = require("../pool");

async function getAllAuthors() {
  const { rows } = await pool.query(`SELECT * FROM authors`);
  return rows;
}

module.exports = {
  getAllAuthors,
};
