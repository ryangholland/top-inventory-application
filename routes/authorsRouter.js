const { Router } = require("express");
const { getAuthors } = require("../controllers/authorsController");

const authorsRouter = Router();

authorsRouter.get("/", getAuthors);

module.exports = authorsRouter;
