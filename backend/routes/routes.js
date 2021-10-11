const express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

const Employee = require('../models/employee.js');

// GET API
router.get('/', (req, res) => {
  Employee.find((err, doc) => {
    if (err) {
      console.log(`Error in GET data ${err}`);
    } else {
      res.send(doc);
    }
  });
});

// GET single employee
router.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log(`Error in GET Employee by ID ${err}`);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(` No record found with ${req.params.id}`);
  }
});

// POST API
router.post('/', (req, res) => {
  let emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    dept: req.body.dept
  });

  emp.save((err, doc) => {
    if (err) {
      console.log(`Error in POST data ${err}`);
    } else {
      res.send(doc);
    }
  });
});

// PUT API
router.put('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    let emp = {
      name: req.body.name,
      position: req.body.position,
      dept: req.body.dept
    };
    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
      if (err) {
        console.log(`Error in UPDATE Employee by ID ${err}`);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(` No record found with ${req.params.id}`);
  }
});

// DELETE single employee
router.delete('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log(`Error in DELETE Employee by ID ${err}`);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(` No record found with ${req.params.id}`)
  }
});

module.exports = router;