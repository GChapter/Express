const express = require("express");
const app = express();
const { router: studentRouter } = require("./studentRoute");
const classRouter = require("./classRoute");

app.use("/", studentRouter);
app.use("/", classRouter);


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
