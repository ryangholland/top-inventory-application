const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
  res.send("Book List");
});

module.exports = {
  getBooks,
};
