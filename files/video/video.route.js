const { uploadManager, videoManager } = require("../../utils/multer")
const { checkSchema } = require("express-validator")
const videoRoute = require("express").Router()
const { isAuthenticated, adminVerifier } = require("../../utils")
const { validate } = require("../../validations/validate")
const {
  createVideoController,
  getVideoController,
  updateVideoController,
  deleteVideoController,
} = require("./video.controller")

//routes

videoRoute.use(isAuthenticated)

videoRoute.route("/").get(getVideoController)

videoRoute.use(adminVerifier)

videoRoute
  .route("/")
  .post(videoManager("videoManager").single("video"), createVideoController)

videoRoute
  .route("/:id")
  .patch(videoManager("videoManager").single("video"), updateVideoController)

videoRoute.route("/:id").delete(deleteVideoController)

module.exports = videoRoute
