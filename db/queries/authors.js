const pool = require("../pool");

async function getAllAuthors() {
  const { rows } = await pool.query(`SELECT * FROM authors`);
  return rows;
}

async function searchAuthors(searchTerm, sortTerm) {
  const validSortTerms = ["first_name", "last_name"];
  if (sortTerm && !validSortTerms.includes(sortTerm)) {
    throw new Error("Invalid sort term");
  }

  let query = `SELECT * FROM authors`;
  const params = [];

  if (searchTerm) {
    query += ` WHERE 
      first_name ILIKE '%' || $1 || '%' OR
      last_name ILIKE '%' || $1 || '%'`;
    params.push(searchTerm);
  }

  if (sortTerm) {
    query += ` ORDER BY ${sortTerm}`;
  }

  const { rows } = await pool.query(query, params);
  return rows;
}

async function getAuthorById(id) {
  const { rows } = await pool.query(`SELECT * FROM authors WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

async function insertAuthor(firstName, lastName) {
  try {
    await pool.query(
      "INSERT INTO authors (first_name, last_name) VALUES ($1, $2)",
      [firstName, lastName]
    );
  } catch (err) {
    console.error("Error inserting author:", err.message);
    throw err;
  }
}

async function updateAuthor(id, newFirstName, newLastName) {
  try {
    await pool.query(
      "UPDATE authors SET first_name = $1, last_name = $2 WHERE id = $3",
      [newFirstName, newLastName, id]
    );
  } catch (err) {
    console.error("Error updating author:", err.message);
    throw err;
  }
}

async function deleteAuthor(id) {
  try {
    await pool.query("DELETE FROM authors WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting author:", err.message);
    throw err;
  }
}

module.exports = {
  getAllAuthors,
  searchAuthors,
  getAuthorById,
  insertAuthor,
  updateAuthor,
  deleteAuthor,
};
