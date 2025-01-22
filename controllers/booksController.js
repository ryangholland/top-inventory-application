const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await db.getAllBooks();
  // console.log(books);
  res.render("books", {
    title: "Books",
    books: books,
  });
});

module.exports = {
  getAllBooks,
};
