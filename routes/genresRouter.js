const { Router } = require("express");
const { getAllGenres } = require("../controllers/genresController");

const genresRouter = Router();

genresRouter.get("/", getAllGenres);

module.exports = genresRouter;
