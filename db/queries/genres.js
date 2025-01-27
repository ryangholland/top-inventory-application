const pool = require("../pool");

async function getAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
}

async function searchGenres(searchTerm, sortTerm) {
  const validSortTerms = ["name"]; 
  if (sortTerm && !validSortTerms.includes(sortTerm)) {
    throw new Error("Invalid sort term");
  }

  let query = `SELECT * FROM genres`;
  const params = [];

  if (searchTerm) {
    query += ` WHERE name ILIKE '%' || $1 || '%'`;
    params.push(searchTerm);
  }

  if (sortTerm) {
    query += ` ORDER BY ${sortTerm}`;
  }

  const { rows } = await pool.query(query, params);
  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query(`SELECT * FROM genres WHERE id = $1`, [id]);
  return rows[0];
}

async function insertGenre(genreName) {
  try {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [genreName]);
  } catch (err) {
    console.error("Error inserting genre:", err.message);
    throw err;
  }
}

async function updateGenre(id, newName) {
  try {
    await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [
      newName,
      id,
    ]);
  } catch (err) {
    console.error("Error updating genre:", err.message);
    throw err;
  }
}

async function deleteGenre(id) {
  try {
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting genre:", err.message);
    throw err;
  }
}

module.exports = {
  getAllGenres,
  searchGenres,
  getGenreById,
  insertGenre,
  updateGenre,
  deleteGenre,
};
