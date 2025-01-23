const pool = require("../pool");

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

async function getBookById(id) {
  const { rows } = await pool.query(`SELECT * FROM books WHERE id = $1`, [id]);
  return rows[0];
}

async function insertBook(title, author_id, genre_id, pages) {
  try {
    await pool.query(
      "INSERT INTO books (title, author_id, genre_id, pages) VALUES ($1, $2, $3, $4)",
      [title, author_id, genre_id, pages]
    );
  } catch (err) {
    console.error("Error inserting book:", err.message);
    throw err;
  }
}

async function updateBook(id, title, author_id, genre_id, pages) {
  try {
    await pool.query(
      "UPDATE books SET title = $1, author_id = $2, genre_id = $3, pages = $4 WHERE id = $5",
      [title, author_id, genre_id, pages, id]
    );
  } catch (err) {
    console.error("Error updating book:", err.message);
    throw err;
  }
}

async function deleteBook(id) {
  try {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting book:", err.message);
    throw err;
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  insertBook,
  updateBook,
  deleteBook,
};
