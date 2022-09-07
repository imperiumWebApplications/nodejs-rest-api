const express = require("express");
const {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/feed");
const router = express.Router();
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

// GET /feed/posts
router.get("/posts", isAuth, getPosts);

// POST /feed/post
router.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  isAuth,

  addPost
);

// GET /feed/post/:postId
router.get("/post/:postId", isAuth, getPost);

// PUT /feed/post/:postId
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

// DELETE /feed/post/:postId
router.delete("/post/:postId", isAuth, deletePost);



module.exports = router;
