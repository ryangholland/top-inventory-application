const { Router } = require("express");
const {
  getAllBooks,
  getCreateBook,
  postCreateBook,
  getUpdateBook,
  postUpdateBook,
  postDeleteBook,
} = require("../controllers/booksController");

const booksRouter = Router();

booksRouter.get("/", getAllBooks);

booksRouter.get("/create", getCreateBook);
booksRouter.post("/create", postCreateBook);

booksRouter.get("/:id/update", getUpdateBook);
booksRouter.post("/:id/update", postUpdateBook);

booksRouter.post("/:id/delete", postDeleteBook);

module.exports = booksRouter;
