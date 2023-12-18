const { default: mongoose } = require("mongoose")
const { queryConstructor } = require("../../utils")

const { UserSuccess, UserFailure } = require("./photo.messages")
const { PhotoRepository } = require("./photo.repository")
const { LIMIT, SKIP, SORT } = require("../../constants")
const { PhotoFailure, PhotoSuccess } = require("./photo.messages")
const { Photo } = require("./photo.model")

class PhotoService {
  static async createPhoto(payload) {
    const { body, image } = payload

    const validatePhoto = await PhotoRepository.validatePhoto({
      title: body.title,
    })

    if (validatePhoto) return { success: false, msg: PhotoFailure.TITLE_EXIST }
    const photo = await PhotoRepository.create({
      photo: image,
      ...body,
    })

    if (!photo) return { success: false, msg: PhotoFailure.CREATE }

    return {
      success: true,
      msg: PhotoSuccess.CREATE,
    }
  }

  static async updatePhoto(payload, photoId) {
    const { image, body } = payload
    const photo = await PhotoRepository.updatePhotoById(photoId, {
      image,
      ...body,
    })

    if (!photo) return { success: false, msg: PhotoFailure.UPDATE }

    return { success: true, msg: PhotoSuccess.UPDATE }
  }

  static async getPhotos(payload) {
    const { error, params, limit, skip, sort } = queryConstructor(
      payload,
      "createdAt",
      "Photo"
    )
    if (error) return { success: false, msg: error }

    const photos = await PhotoRepository.findAllPhotosParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (photos.length < 1)
      return { success: true, msg: PhotoFailure.FETCH, data: [] }

    return { success: true, msg: PhotoSuccess.FETCH, data: photos }
  }

  static async deletePhoto(photoId) {
    const photo = await PhotoRepository.deletePhotoById(photoId)

    if (!photo) return { success: false, msg: PhotoFailure.DELETE }

    return { success: true, msg: PhotoSuccess.DELETE }
  }
}

module.exports = { PhotoService }
