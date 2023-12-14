const { Photo } = require("./photo.model")
const mongoose = require("mongoose")

class PhotoRepository {
  static async create(payload) {
    return await Photo.create(payload)
  }

  static async findPhotoWithParams(photoPayload, select) {
    return await Photo.find({ ...photoPayload }).select(select)
  }

  static async findSinglePhotoWithParams(photoPayload, select) {
    const photo = await Photo.findOne({ ...photoPayload }).select(select)

    return photo
  }

  static async validatePhoto(photoPayload) {
    return Photo.exists({ ...photoPayload })
  }

  static async findAllPhotosParams(photoPayload) {
    const { limit, skip, sort, ...restOfPayload } = photoPayload

    const photo = await Photo.find({ ...restOfPayload })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    return photo
  }

  static async updatePhotoDetails(id, params) {
    return Photo.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $push: { ...params } } //returns details about the update
    )
  }

  static async updatePhotoProfile(payload, params) {
    return Photo.findOneAndUpdate({ ...payload }, { $set: { ...params } })
  }

  static async updatePhotoById(id, params) {
    return await Photo.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { ...params } }
    )
  }
  static async updatePhotoById(id) {
    return await Photo.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    })
  }
}

module.exports = { PhotoRepository }
