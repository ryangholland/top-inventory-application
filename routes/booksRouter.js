const { Router } = require("express");
const { getAllBooks } = require("../controllers/booksController")

const booksRouter = Router();

booksRouter.get("/", getAllBooks);

module.exports = booksRouter;