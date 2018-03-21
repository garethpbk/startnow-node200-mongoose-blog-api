const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id).then(user => {
    user ? res.status(200).json(user) : res.status(404).send("404 user not found");
  });
});

router.post("/", (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    err ? res.status(404).send(err) : res.status(201).json(user);
  });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let update = req.body;
  User.findByIdAndUpdate(id, { $set: update }, (err, user) => {
    err ? console.log(err) : res.status(204).json(user);
  });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (err, user) => {
    err ? console.log(err) : res.status(200).json(user);
  });
});

module.exports = router;
