const { Router } = require("express");
const {
  getAllGenres,
  getCreateGenre,
  postCreateGenre,
  getUpdateGenre,
  postUpdateGenre,
} = require("../controllers/genresController");

const genresRouter = Router();

genresRouter.get("/", getAllGenres);

genresRouter.get("/create", getCreateGenre);
genresRouter.post("/create", postCreateGenre);

genresRouter.get("/:id/update", getUpdateGenre);
genresRouter.post("/:id/update", postUpdateGenre);

module.exports = genresRouter;
