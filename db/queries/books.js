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

async function searchBooks(searchTerm, sortTerm) {
  const validSortTerms = ["book_title", "author_name", "genre_name", "pages"];
  if (sortTerm && !validSortTerms.includes(sortTerm)) {
    throw new Error("Invalid sort term");
  }

  if (sortTerm == "author_name") sortTerm = "a.last_name";

  let query = `SELECT 
      b.id AS book_id, 
      b.title AS book_title, 
      b.pages, 
      g.name AS genre_name, 
   CONCAT(a.first_name, ' ', a.last_name) AS author_name
    FROM Books b
    JOIN Genres g ON b.genre_id = g.id
    JOIN Authors a ON b.author_id = a.id`;
  const params = [];

  if (searchTerm) {
    query += ` WHERE 
      b.title ILIKE '%' || $1 || '%' OR
      g.name ILIKE '%' || $1 || '%' OR
    CONCAT(a.first_name, ' ', a.last_name) ILIKE '%' || $1 || '%'`;
    params.push(searchTerm);
  }

  if (sortTerm) {
    query += ` ORDER BY ${sortTerm}`;
  }

  if (sortTerm == "pages") {
    query += ` DESC`;
  }

  const { rows } = await pool.query(query, params);
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
  searchBooks,
  getBookById,
  insertBook,
  updateBook,
  deleteBook,
};
