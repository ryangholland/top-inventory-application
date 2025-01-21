const asyncHandler = require("express-async-handler");

const getAuthors = asyncHandler(async (req, res) => {
  res.send("Authors List");
});

module.exports = {
  getAuthors,
};
