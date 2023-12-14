const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema(
  {
    photo: {
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

const photo = mongoose.model("Photo", photoSchema, "photo")

module.exports = { Photo: photo }
