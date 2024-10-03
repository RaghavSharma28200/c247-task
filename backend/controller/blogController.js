const Blog = require("../models/blogModal");

const createBlog = async (req, res, next) => {
  try {
    const { title, content, lastEditedBy } = req.body;
    await Blog.create({
      title,
      content,
      lastEditedBy,
    });
    res.status(200).send({
      status: 200,
      message: "Blog created!",
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, content, lastEditedBy, isLocked, id } = req.body;

    await Blog.findByIdAndUpdate(
      id,
      { title, content, lastEditedBy, isLocked },
      { new: true }
    );

    res.status(200).send({
      status: 200,
      message: "Blog updated!",
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const lockUnlockBlog = async (req, res, next) => {
  try {
    const { id, isLocked, lockedBy } = req.body;
    const date = new Date();

    console.log(id, isLocked, lockedBy);
    
    await Blog.findByIdAndUpdate(
      id,
      {
        lockedBy,
        isLocked,
        lockedAt: date,
      },
      { new: true }
    );

    res.status(200).send({
      status: 200,
      message: "Blog locked/unlock",
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const data = await Blog.find({});

    res.status(200).send({
      status: 200,
      message: "fetch successfully!",
      data,
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Blog.findById(id);
    res.status(200).send({
      status: 200,
      message: "fetch successfully!",
      data,
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  lockUnlockBlog,
  getAllBlogs,
  getBlog,
};
