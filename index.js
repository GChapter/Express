require('dotenv').config();
const express = require("express");
const app = express();
const { router: studentRouter } = require("./studentRoute");
const { router: classRouter } = require("./classRoute");

app.use("/", studentRouter);
app.use("/", classRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
});
