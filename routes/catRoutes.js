const { Router } = require("express");
const { json } = require("express/lib/response");

const router = require("express").Router();
const Cat = require("../db");

const data = [];

router.post("/create", (req, res, next) => {
  const cat = req.body;
  new Cat(cat)
    .save()
    .then(() => {
      res.status(201).send("Sucessfully Created");
    })
    .catch((err) => next({ status: 400, message: err.message }));
});

router.get("/getAll", (req, res, next) => {
  Cat.find()
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => next({ status: 400, message: err.message }));
});

router.get("/get/:id", (req, res, next) => {
  const id = req.params.id;
  Cat.findById(id, (err, found) => {
    if (err) {
      return next({ status: 400, message: err.message });
    } else {
      res.status(200).send(found);
    }
  });
});

router.get("/find", (req, res, next) => {
  Cat.find(req.query, (err, cat) => {
    if (err) {
      return next({ status: 400, message: err.message });
    } else {
      return res.json(cat);
    }
  });
});

router.put("/replace/:id", (req, res, next) => {
  const newCat = req.query;
  const id = req.params.id;
  Cat.findByIdAndUpdate(id, newCat, (err) => {
    if (err) {
      return next({ status: 400, message: err.message });
    } else {
      Cat.findById(id, (err, updatedCat) => {
        if (err) {
          return next({ status: 400, message: err.message });
        } else {
          res.status(202).send(updatedCat);
        }
      });
    }
  });
});

router.delete("/remove/:id", (req, res, next) => {
  const id = req.params.id;

  Cat.findByIdAndDelete(id, (err) => {
    if (err) {
      return next({ status: 400, message: err.message });
    } else {
      res.status(204).send("Cat deleted");
    }
  });
});

module.exports = router;
