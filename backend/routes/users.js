const router = require("express").Router();
const User = require("..models/User");
const auth = require("../middleware/auth");

router.post("/:id/follow", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  const me = await User.findById(req.user.id);

  user.followers.push(me._id);
  me.following.push(user._id);

  await user.save();
  await me.save();

  res.json({ message: "Followed" });
});

module.exports = router;
