const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://heroku_6gz38tc0:e0t7vbbg6gpk3nfc2j7cl8iler@ds121089.mlab.com:21089/heroku_6gz38tc0");

mongoose.Promise = Promise;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send();
});

app.use("/api/users", require("./routes/users"));
app.use("/api/blogs", require("./routes/blogs"));

module.exports = app;
