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

module.exports = {
  getAllBooks,
};
