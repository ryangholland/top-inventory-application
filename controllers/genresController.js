const asyncHandler = require("express-async-handler");

const getGenres = asyncHandler(async (req, res) => {
  res.send("Genres List");
});

module.exports = {
  getGenres,
};
