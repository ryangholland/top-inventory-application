const { Router } = require("express");
const { getBooks } = require("../controllers/booksController")

const booksRouter = Router();

booksRouter.get("/", getBooks);

module.exports = booksRouter;