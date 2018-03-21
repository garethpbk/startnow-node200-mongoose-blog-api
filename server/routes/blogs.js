const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

router.get("/", (req, res) => {
  Blog.find().then(blogs => {
    res.status(200).json(blogs);
  });

  router.get("/featured", (req, res) => {
    Blog.where("featured")
      .equals(true)
      .then(blogs => {
        res.status(200).json(blogs);
      });
  });

  router.get("/:id", (req, res) => {
    let id = req.params.id;
    Blog.findById(id).then(blog => {
      blog ? res.status(200).json(blog) : res.status(404).send("404 blog not found");
    });
  });

  router.post("/", (req, res) => {
    let dbUser = null;
    User.findById(req.body.authorId)
      .then(user => {
        dbUser = user;

        let newBlog = new Blog(req.body);

        newBlog.author = user._id;

        return newBlog.save();
      })
      .then(blog => {
        dbUser.blogs.push(blog);

        dbUser.save().then(() => res.status(201).json(blog));
      });
  });

  router.put("/:id", (req, res) => {
    let id = req.params.id;
    let update = req.body;
    Blog.findByIdAndUpdate(id, { $set: update }, (err, blog) => {
      err ? console.log(err) : res.status(204).json(blog);
    });
  });

  router.delete("/:id", (req, res) => {
    let id = req.params.id;
    let update = req.body;
    Blog.findByIdAndRemove(id, (err, blog) => {
      err ? console.log(err) : res.status(200).json(blog);
    });
  });

  //
});

module.exports = router;
