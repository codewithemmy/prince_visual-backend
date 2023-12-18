const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const { responseHandler } = require("../../core/response")
const { manageAsyncOps, fileModifier } = require("../../utils")
const { CustomError } = require("../../utils/errors")
const { VideoService } = require("./video.service")

const createVideoController = async (req, res, next) => {
  const value = fileModifier(req)

  const [error, data] = await manageAsyncOps(VideoService.createVideo(value))

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const getVideoController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(VideoService.getVideo(req.query))

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const updateVideoController = async (req, res, next) => {
  const value = fileModifier(req)

  const [error, data] = await manageAsyncOps(
    VideoService.updateVideo(value, req.params.id)
  )
  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const deleteVideoController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    VideoService.deleteVideo(req.params.id)
  )
  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

module.exports = {
  createVideoController,
  getVideoController,
  updateVideoController,
  deleteVideoController,
}
