const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const booksRouter = require("./routes/booksRouter");
const authorsRouter = require("./routes/authorsRouter");
const genresRouter = require("./routes/genresRouter");

const app = express();

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/@fortawesome', express.static(__dirname + '/node_modules/@fortawesome'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory application running on port ${PORT}...`);
});
