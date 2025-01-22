const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllGenres = asyncHandler(async (req, res) => {
  const genres = await db.getAllGenres();
  // console.log(genres)
  res.render("genres", {
    title: "Genres",
    genres: genres,
  });
});

module.exports = {
  getAllGenres,
};
