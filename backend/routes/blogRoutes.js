const express = require("express");
const { protect } = require("../controller/userController");
const {
  createBlog,
  updateBlog,
  lockUnlockBlog,
  getAllBlogs,
  getBlog,
} = require("../controller/blogController");

const router = express.Router();

router.use(protect);

router.post("/create-blog", createBlog);
router.put("/update-blog", updateBlog);
router.get("/get-all-blogs", getAllBlogs);
router.get("/get-blog/:id", getBlog);
router.put("/blog-lock", lockUnlockBlog);

module.exports = router;
