const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
    header: {
      type: String,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
)

const blog = mongoose.model("Blog", blogSchema, "blog")

module.exports = { Blog: blog }
