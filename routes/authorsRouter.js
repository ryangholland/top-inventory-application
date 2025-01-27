const { Router } = require("express");
const {
  getAuthors,
  getCreateAuthor,
  postCreateAuthor,
  getUpdateAuthor,
  postUpdateAuthor,
  postDeleteAuthor,
} = require("../controllers/authorsController");

const authorsRouter = Router();

authorsRouter.get("/", getAuthors);

authorsRouter.get("/create", getCreateAuthor);
authorsRouter.post("/create", postCreateAuthor);

authorsRouter.get("/:id/update", getUpdateAuthor);
authorsRouter.post("/:id/update", postUpdateAuthor);

authorsRouter.post("/:id/delete", postDeleteAuthor)

module.exports = authorsRouter;
