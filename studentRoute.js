const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());

class Student {
  constructor(id, name, inClass) {
    this.id = id;
    this.name = name;
    this.inClass = inClass;
  }
}

const students = [];

router.post(
  "/student",
  function (req, res, next) {
    if (!req.body.id) {
      res.status(400).send("Missing student id");
      return;
    }
    if (!req.body.name) {
      res.status(400).send("Missing student name");
      return;
    }
    if (!req.body.inClass) {
      res.status(400).send("Missing student class");
      return;
    }
    if (students.find((student) => student.id === req.body.id) !== undefined) {
      res.status(400).send("Student id already exists");
      return;
    }
    if (
      students.find((student) => student.name === req.body.name) !== undefined
    ) {
      res.status(400).send("Student name already exists");
      return;
    }
    next();
  },
  function (req, res) {
    const student = new Student(req.body.id, req.body.name, req.body.inClass);
    students.push(student);
    res.send("Student created");
  }
);

router.put(
  "/student/:id",
  function (req, res, next) {
    if (!req.body.name && !req.body.inClass) {
      res
        .status(400)
        .send(
          "Missing student name and class, please specify at least one to update"
        );
    }
    next();
  },
  function (req, res) {
    const student = students.find((student) => student.id === req.params.id);
    if (!student) {
      res.status(404).send("Student not found");
      return;
    }
    if (req.body.name) {
      student.name = req.body.name;
    }
    if (req.body.inClass) {
      student.inClass = req.body.inClass;
    }
    res.send("Student updated");
  }
);

router.delete("/student/:id", function (req, res) {
  const index = students.findIndex((student) => student.id === req.params.id);
  if (index === -1) {
    res.status(404).send("Student not found");
    return;
  }
  students.splice(index, 1);
  res.send("Student deleted");
});

router.get("/students", function (req, res) {
  res.send(students);
});

router.get("/student/id/:id", function (req, res) {
  const student = students.find((student) => student.id === req.params.id);
  if (student) res.send(student);
  else res.status(404).send("Student not found");
});

router.get("/student/name/:name", function (req, res) {
  const student = students.filter((student) =>
    student.name.includes(req.params.name)
  );
  if (student.length > 0) res.send(student);
  else res.status(404).send("Student not found");
});

router.get("/student/class/:inClass", function (req, res) {
  const student = students.filter((student) =>
    student.inClass.includes(req.params.inClass)
  );
  if (student.length > 0) res.send(student);
  else res.status(404).send("Student not found");
});

module.exports = { router, students };
