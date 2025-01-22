const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult, query } = require("express-validator");

const getAllGenres = asyncHandler(async (req, res) => {
  const genres = await db.getAllGenres();
  // console.log(genres)
  res.render("genres", {
    title: "Genres",
    genres: genres,
  });
});

const validateGenre = [
  body("genreName")
    .trim()
    .isAlpha()
    .withMessage("Name must only contain letters")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name must be between 1 and 20 letters"),
];

const getCreateGenre = asyncHandler(async (req, res) => {
  res.render("createGenre", {
    title: "Add Genre",
  });
});

const postCreateGenre = [
  validateGenre,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createGenre", {
        title: "Add Genre",
        errors: errors.array(),
      });
    }
    const { genreName } = req.body;

    await db.insertGenre(genreName);

    res.redirect("/genres");
  }),
];

const getUpdateGenre = asyncHandler(async (req, res) => {
  const genre = await db.getGenreById(req.params.id);
  console.log(genre)
  res.render("updateGenre", {
    title: "Edit Genre",
    genre: genre,
  });
});

const postUpdateGenre = [
  validateGenre,
  asyncHandler(async (req, res) => {
    const genre = await db.getGenreById(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateGenre", {
        title: "Edit Genre",
        genre: genre,
        errors: errors.array(),
      });
    }
    const { genreName } = req.body;

    // db query to update genre
    console.log(`Updating ${genre.name} to ${genreName}...`)
    await db.updateGenre(genre.id, genreName)

    res.redirect("/genres")
  })
]

module.exports = {
  getAllGenres,
  getCreateGenre,
  postCreateGenre,
  getUpdateGenre,
  postUpdateGenre
};
