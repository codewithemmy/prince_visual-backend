const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema(
  {
    video: {
      type: String,
    },
    link: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
)

const video = mongoose.model("Video", videoSchema, "video")

module.exports = { Video: video }
