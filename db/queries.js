const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query(`
    SELECT 
        books.id AS book_id,
        books.title AS book_title,
        authors.first_name || ' ' || authors.last_name AS author_name,
        genres.name AS genre_name,
        books.pages
    FROM 
        books
    JOIN 
        authors ON books.author_id = authors.id
    JOIN 
        genres ON books.genre_id = genres.id;
    `);
  return rows;
}

async function getAllAuthors() {
  const { rows } = await pool.query(`SELECT * FROM authors`);
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query(`SELECT * FROM genres WHERE id = $1`, [id]);
  return rows[0];
}

async function insertGenre(genreName) {
  await pool.query("INSERT INTO genres (name) VALUES ($1)", [genreName]);
}

async function updateGenre(id, newName) {
  try {
    await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [
      newName,
      id,
    ]);
  } catch (err) {
    console.error("Error updating genre:", err);
    throw err;
  }
}

async function deleteGenre(id) {
  try {
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting genre:", err);
    throw err;
  }
}

module.exports = {
  getAllBooks,
  getAllAuthors,
  getAllGenres,
  getGenreById,
  insertGenre,
  updateGenre,
  deleteGenre,
};
