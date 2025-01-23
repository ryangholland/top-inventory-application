const asyncHandler = require("express-async-handler");
const db = require("../db/queries/authors");

const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await db.getAllAuthors();
  // console.log(authors)
  res.render("authors", {
    title: "Authors",
    authors: authors,
  });
});

module.exports = {
  getAllAuthors,
};
