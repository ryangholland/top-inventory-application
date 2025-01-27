const asyncHandler = require("express-async-handler");
const db = require("../db/queries/books");
const { getAllAuthors } = require("../db/queries/authors");
const { getAllGenres } = require("../db/queries/genres");
const { body, validationResult } = require("express-validator");

const getBooks = asyncHandler(async (req, res) => {
  let books;
  
  if (req.query.search || req.query.sort) {
    books = await db.searchBooks(req.query.search, req.query.sort)
  } else {
    books = await db.getAllBooks()
  }
  res.render("books/books", {
    title: "Books",
    books: books,
    lastSearch: req.query.search
  });
});

const validateBook = [
  body("title")
    .trim()
    .matches(/^[a-zA-Z0-9\s.,;:'"!?()&\-]+$/)
    .withMessage("Title must only contain letters, numbers, and punctuation")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("pages")
    .trim()
    .optional({ values: "falsy" })
    .isInt({ min: 2, max: 99999 })
    .withMessage(`Pages must be a number between 2 and 99999`),
];

const getCreateBook = asyncHandler(async (req, res) => {
  const authors = await getAllAuthors();
  const genres = await getAllGenres();
  res.render("books/createBook", {
    title: "Add Book",
    authors: authors,
    genres: genres,
  });
});

const postCreateBook = [
  validateBook,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const authors = await getAllAuthors();
      const genres = await getAllGenres();
      return res.status(400).render("books/createBooks", {
        title: "Add Book",
        authors: authors,
        genres: genres,
        errors: errors.array(),
      });
    }

    const { title, author_id, genre_id, pages } = req.body;
    const pagesValue = pages ? parseInt(pages, 10) : null;

    await db.insertBook(title, author_id, genre_id, pagesValue);

    res.redirect("/books");
  }),
];

const getUpdateBook = asyncHandler(async (req, res) => {
  const book = await db.getBookById(req.params.id);
  const authors = await getAllAuthors();
  const genres = await getAllGenres();
  res.render("books/updateBook", {
    title: "Edit Book",
    book: book,
    authors: authors,
    genres: genres,
  });
});

const postUpdateBook = [
  validateBook,
  asyncHandler(async (req, res) => {
    const book = await db.getBookById(req.params.id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const authors = await getAllAuthors();
      const genres = await getAllGenres();
      return res.status(400).render("books/updateBook", {
        title: "Edit Book",
        book: book,
        authors: authors,
        genres: genres,
        errors: errors.array(),
      });
    }

    const { title, author_id, genre_id, pages } = req.body;
    const pagesValue = pages ? parseInt(pages, 10) : null;

    await db.updateBook(book.id, title, author_id, genre_id, pagesValue);

    res.redirect("/books");
  }),
];

const postDeleteBook = asyncHandler(async (req, res) => {
  await db.deleteBook(req.params.id);
  res.redirect("/books");
});

module.exports = {
  getBooks,
  getCreateBook,
  postCreateBook,
  getUpdateBook,
  postUpdateBook,
  postDeleteBook,
};
