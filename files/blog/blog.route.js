const { uploadManager } = require("../../utils/multer")
const { checkSchema } = require("express-validator")
const blogRoute = require("express").Router()
const { isAuthenticated, adminVerifier } = require("../../utils")
const { validate } = require("../../validations/validate")
const {
  getBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} = require("./blog.controller")

//routes

blogRoute.use(isAuthenticated)

blogRoute.route("/").get(getBlogController)

blogRoute.use(adminVerifier)

blogRoute
  .route("/")
  .post(uploadManager("blogImage").single("photo"), createBlogController)

blogRoute
  .route("/:id")
  .patch(uploadManager("photoManager").single("photo"), updateBlogController)

blogRoute.route("/:id").delete(deleteBlogController)

module.exports = blogRoute
