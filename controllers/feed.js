const { validationResult } = require("express-validator");
const Post = require("../models/Post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imagrUrl: "images/book.jpeg",
        creator: {
          name: "Max Schwarz",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.addPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }

  // Create post in db
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/book.jpeg",
    creator: { name: "Max" },
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post created successfully!",
      post: {
        _id: new Date().toISOString(),
        title: title,
        content: content,
        createdAt: new Date(),
        creator: {
          name: "Max",
        },
      },
    });
  });
};
