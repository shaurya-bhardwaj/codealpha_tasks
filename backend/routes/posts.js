const router = require("express").Router();
const Post = require("..models/Post");
const auth = require("..middleware/auth");

router.post("/", auth, async (req, res) => {
  const post = new Post({ user: req.user.id, content: req.body.content });
  await post.save();
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "username");
  res.json(posts);
});

router.post("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes.push(req.user.id);
  await post.save();
  res.json(post);
});

module.exports = router;
