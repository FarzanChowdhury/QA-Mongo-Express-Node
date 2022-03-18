console.log("Hello, World!");

const { response } = require("express");
const parser = require("body-parser");
const express = require("express");

const app = express();
const catRoutes = require("./routes/catRoutes");

app.use(parser.json());

app.use((err, req, res, next) => {
  console.log("Error has Occured");
  return next();
});

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date());
  return next();
});

app.use("/cat", catRoutes);

app.use("*", (req, res, next) => {
  return next({
    status: 404,
    message: "Invalid URL",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
});

const server = app.listen(4494, () =>
  console.log("Server Successfully Started!", server.address().port)
);

module.exports = server;
