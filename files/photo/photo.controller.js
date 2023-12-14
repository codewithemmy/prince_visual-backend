const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const { responseHandler } = require("../../core/response")
const { manageAsyncOps, fileModifier } = require("../../utils")
const { CustomError } = require("../../utils/errors")
const { PhotoService } = require("./photo.service")

const createPhotoController = async (req, res, next) => {
  const value = fileModifier(req)

  const [error, data] = await manageAsyncOps(PhotoService.createPhoto(value))

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const getPhotoController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(PhotoService.getPhotos(req.query))

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const updatePhotoController = async (req, res, next) => {
  const value = fileModifier(req)

  const [error, data] = await manageAsyncOps(
    PhotoService.updatePhoto(value, req.params.id)
  )
  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const deletePhotoController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    PhotoService.deletePhoto(req.params.id)
  )
  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

module.exports = {
  createPhotoController,
  getPhotoController,
  updatePhotoController,
  deletePhotoController,
}
