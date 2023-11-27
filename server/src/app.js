require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const { default: helmet } = require("helmet");
var bodyParser = require("body-parser");

const app = express();

//init middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

//init db
require("./dbs/init.mongodb");

//init route
app.use("/", require("./routers"));

//handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    status: "error",
    code: status,
    stack: err?.stack,
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;
