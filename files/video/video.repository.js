const { Video } = require("./video.model")
const mongoose = require("mongoose")

class VideoRepository {
  static async create(payload) {
    return await Video.create(payload)
  }

  static async findVideoWithParams(videoPayload, select) {
    return await Video.find({ ...videoPayload }).select(select)
  }

  static async findSingleVideoWithParams(videoPayload, select) {
    const video = await Video.findOne({ ...videoPayload }).select(select)

    return video
  }

  static async validateVideo(videoPayload) {
    return Video.exists({ ...videoPayload })
  }

  static async findAllVideoParams(videoPayload) {
    const { limit, skip, sort, ...restOfPayload } = videoPayload

    const video = await Video.find({ ...restOfPayload })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    return video
  }

  static async updateVideoDetails(id, params) {
    return Video.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $push: { ...params } } //returns details about the update
    )
  }

  static async updateVideoProfile(payload, params) {
    return Video.findOneAndUpdate({ ...payload }, { $set: { ...params } })
  }

  static async updateVideoById(id, params) {
    return await Video.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { ...params } }
    )
  }
  static async deleteVideoById(id) {
    return await Video.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    })
  }
}

module.exports = { VideoRepository }
