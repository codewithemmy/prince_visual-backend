const { default: mongoose } = require("mongoose")
const { queryConstructor } = require("../../utils")

const { VideoRepository } = require("./video.repository")
const { LIMIT, SKIP, SORT } = require("../../constants")
const { VideoFailure, VideoSuccess } = require("./video.messages")

class VideoService {
  static async createVideo(payload) {
    const { body, image } = payload

    const validateVideo = await VideoRepository.validateVideo({
      title: body.title,
    })

    if (validateVideo) return { success: false, msg: VideoFailure.TITLE_EXIST }
    const newVideo = await VideoRepository.create({
      video: image,
      ...body,
    })

    if (!newVideo) return { success: false, msg: VideoFailure.CREATE }

    return {
      success: true,
      msg: VideoSuccess.CREATE,
    }
  }

  static async updateVideo(payload, videoId) {
    const { video, body } = payload
    const updateVideo = await VideoRepository.updateVideoById(videoId, {
      video,
      ...body,
    })

    if (!updateVideo) return { success: false, msg: VideoFailure.UPDATE }

    return { success: true, msg: VideoSuccess.UPDATE }
  }

  static async getVideo(payload) {
    const { error, params, limit, skip, sort } = queryConstructor(
      payload,
      "createdAt",
      "Video"
    )
    if (error) return { success: false, msg: error }

    const video = await VideoRepository.findAllVideoParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (video.length < 1)
      return { success: true, msg: VideoFailure.FETCH, data: [] }

    return { success: true, msg: VideoSuccess.FETCH, data: video }
  }

  static async deleteVideo(photoId) {
    const video = await VideoRepository.deleteVideoById(photoId)

    if (!video) return { success: false, msg: VideoFailure.DELETE }

    return { success: true, msg: VideoSuccess.DELETE }
  }
}

module.exports = { VideoService }
