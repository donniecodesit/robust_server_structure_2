const express = require("express");
const app = express();
const urlsRouter = require("./urls/urls.router")
const usesRouter = require("./uses/uses.router")
app.use(express.json());
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);



//Not Found Handler
app.use((req, res, next) => {
  return next({ status: 404, message: `Page not found: ${req.originalUrl}`});
});

//Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
