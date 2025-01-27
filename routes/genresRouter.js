const { Router } = require("express");
const {
  getGenres,
  getCreateGenre,
  postCreateGenre,
  getUpdateGenre,
  postUpdateGenre,
  postDeleteGenre
} = require("../controllers/genresController");

const genresRouter = Router();

genresRouter.get("/", getGenres);

genresRouter.get("/create", getCreateGenre);
genresRouter.post("/create", postCreateGenre);

genresRouter.get("/:id/update", getUpdateGenre);
genresRouter.post("/:id/update", postUpdateGenre);

genresRouter.post("/:id/delete", postDeleteGenre)

module.exports = genresRouter;
