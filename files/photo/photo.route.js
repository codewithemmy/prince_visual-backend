const { uploadManager } = require("../../utils/multer")
const { checkSchema } = require("express-validator")
const photoRoute = require("express").Router()
const { isAuthenticated } = require("../../utils")
const { validate } = require("../../validations/validate")
const {
  createPhotoController,
  getPhotoController,
  updatePhotoController,
  deletePhotoController,
} = require("./photo.controller")

//routes

photoRoute.use(isAuthenticated)

photoRoute
  .route("/")
  .post(uploadManager("photoManager").single("photo"), createPhotoController)

photoRoute.route("/").get(getPhotoController)

photoRoute
  .route("/:id")
  .patch(uploadManager("photoManager").single("photo"), updatePhotoController)

photoRoute.route("/:id").delete(deletePhotoController)

module.exports = photoRoute
