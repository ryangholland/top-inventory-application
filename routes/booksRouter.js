const { Router } = require("express");
const {
  getAllBooks,
  getCreateBook,
  postCreateBook,
  postDeleteBook,
} = require("../controllers/booksController");

const booksRouter = Router();

booksRouter.get("/", getAllBooks);

booksRouter.get("/create", getCreateBook);
booksRouter.post("/create", postCreateBook);

booksRouter.post("/:id/delete", postDeleteBook);

module.exports = booksRouter;
