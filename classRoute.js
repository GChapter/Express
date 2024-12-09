const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { students, classes } = require("./data");

router.use(bodyParser.json());

class Class {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

router.post(
  "/class",
  function (req, res, next) {
    if (!req.body.id) {
      res.status(400).send("Missing class id");
      return;
    }
    if (!req.body.name) {
      res.status(400).send("Missing class name");
      return;
    }
    if (classes.find((newClass) => newClass.id === req.body.id) !== undefined) {
      res.status(400).send("Class id already exists");
      return;
    }
    if (
      classes.find((newClass) => newClass.name === req.body.name) !== undefined
    ) {
      res.status(400).send("Class name already exists");
      return;
    }
    next();
  },
  function (req, res) {
    const newClass = new Class(req.body.id, req.body.name);
    classes.push(newClass);
    res.send("Class created");
  }
);

router.put(
  "/class/:id",
  function (req, res, next) {
    if (!req.body.name) {
      res.status(400).send("Missing class name to update");
      return;
    }
    next();
  },
  function (req, res) {
    const classIndex = classes.findIndex(
      (indexClass) => indexClass.id === req.params.id
    );
    if (classIndex === -1) {
      res.status(404).send("Class not found");
      return;
    }
    classes[classIndex].name = req.body.name;
    res.send("Class updated");
  }
);

router.delete(
  "/class/:name",
  function (req, res, next) {
    const student = students.find(
      (student) => student.inClass === req.params.name
    );
    if (student) {
      res.status(400).send("Class is not empty");
      return;
    }
    next();
  },
  function (req, res) {
    const classIndex = classes.findIndex(
      (indexClass) => indexClass.name === req.params.name
    );
    if (classIndex === -1) {
      res.status(404).send("Class not found");
      return;
    }
    classes.splice(classIndex, 1);
    res.send("Class deleted");
  }
);

router.get("/class/:id", function (req, res) {
  const classIndex = classes.find(
    (indexClass) => indexClass.id === req.params.id
  );
  if (classIndex === undefined) {
    res.status(404).send("Class not found");
    return;
  }
  res.send(classIndex);
});

module.exports = { router };
