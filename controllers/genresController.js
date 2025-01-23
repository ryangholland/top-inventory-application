const asyncHandler = require("express-async-handler");
const db = require("../db/queries/genres");
const { body, validationResult, query } = require("express-validator");

const getAllGenres = asyncHandler(async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genres", {
    title: "Genres",
    genres: genres,
  });
});

const validateGenre = [
  body("genreName")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must only contain letters")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters"),
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

    await db.updateGenre(genre.id, genreName)

    res.redirect("/genres")
  })
]

const postDeleteGenre = asyncHandler(async (req, res) => {
  await db.deleteGenre(req.params.id)
  res.redirect("/genres")
})

module.exports = {
  getAllGenres,
  getCreateGenre,
  postCreateGenre,
  getUpdateGenre,
  postUpdateGenre,
  postDeleteGenre
};
