const { uploadManager } = require("../../utils/multer")
const { checkSchema } = require("express-validator")
const photoRoute = require("express").Router()
const { isAuthenticated, adminVerifier } = require("../../utils")
const { validate } = require("../../validations/validate")
const {
  createPhotoController,
  getPhotoController,
  updatePhotoController,
  deletePhotoController,
} = require("./photo.controller")

//routes

photoRoute.use(isAuthenticated)

photoRoute.route("/").get(getPhotoController)

photoRoute.use(adminVerifier)

photoRoute
  .route("/")
  .post(uploadManager("photoManager").single("photo"), createPhotoController)

photoRoute
  .route("/:id")
  .patch(uploadManager("photoManager").single("photo"), updatePhotoController)

photoRoute.route("/:id").delete(deletePhotoController)

module.exports = photoRoute
