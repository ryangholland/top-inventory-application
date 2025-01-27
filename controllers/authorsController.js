const asyncHandler = require("express-async-handler");
const db = require("../db/queries/authors");
const { body, validationResult } = require("express-validator");

const getAuthors = asyncHandler(async (req, res) => {
  let authors;
  if (req.query.search) {
    authors = await db.searchAuthors(req.query.search);
  } else {
    authors = await db.getAllAuthors();
  }
  res.render("authors/authors", {
    title: "Authors",
    authors: authors,
    lastSearch: req.query.search,
  });
});

const validateAuthor = [
  body("firstName")
    .trim()
    .matches(/^[a-zA-Z\s\-\'.]+$/)
    .withMessage("First name must only contain letters and certain punctuation")
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must be between 2 and 20 characters"),
  body("lastName")
    .trim()
    .matches(/^[a-zA-Z\s\-\'.]+$/)
    .withMessage("Last name must only contain letters and certain punctuation")
    .isLength({ min: 2, max: 20 })
    .withMessage("Last name must be between 2 and 20 characters"),
];

const getCreateAuthor = asyncHandler(async (req, res) => {
  res.render("authors/createAuthor", {
    title: "Add Author",
  });
});

const postCreateAuthor = [
  validateAuthor,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("authors/createAuthor", {
        title: "Add Author",
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;

    await db.insertAuthor(firstName, lastName);

    res.redirect("/authors");
  }),
];

const getUpdateAuthor = asyncHandler(async (req, res) => {
  const author = await db.getAuthorById(req.params.id);
  res.render("authors/updateAuthor", {
    title: "Edit Author",
    author: author,
  });
});

const postUpdateAuthor = [
  validateAuthor,
  asyncHandler(async (req, res) => {
    const author = await db.getAuthorById(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("authors/updateAuthor", {
        title: "Edit Author",
        author: author,
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;

    await db.updateAuthor(author.id, firstName, lastName);

    res.redirect("/authors");
  }),
];

const postDeleteAuthor = asyncHandler(async (req, res) => {
  await db.deleteAuthor(req.params.id);
  res.redirect("/authors");
});

module.exports = {
  getAuthors,
  getCreateAuthor,
  postCreateAuthor,
  getUpdateAuthor,
  postUpdateAuthor,
  postDeleteAuthor,
};
