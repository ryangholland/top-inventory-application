const { Router } = require("express");
const { getGenres } = require("../controllers/genresController");

const genresRouter = Router();

genresRouter.get("/", getGenres);

module.exports = genresRouter;
