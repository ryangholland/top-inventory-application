const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Book Inventory",
  });
});

module.exports = indexRouter;
