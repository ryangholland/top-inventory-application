const pool = require("../pool");

async function getAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
}

async function searchGenres(searchTerm) {
  const { rows } = await pool.query(
    `SELECT * FROM genres WHERE name ILIKE '%' || $1 || '%'`,
    [searchTerm]
  );
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
