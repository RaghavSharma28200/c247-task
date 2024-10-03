const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  isLocked: { type: Boolean, default: false },
  lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  lockedAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
