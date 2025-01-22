const { Router } = require("express");
const { getAllAuthors } = require("../controllers/authorsController");

const authorsRouter = Router();

authorsRouter.get("/", getAllAuthors);

module.exports = authorsRouter;
