const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const { responseHandler } = require("../../core/response")
const { manageAsyncOps, fileModifier } = require("../../utils")
const { CustomError } = require("../../utils/errors")
const { BlogService } = require("./blog.service")

const createBlogController = async (req, res, next) => {
  const value = fileModifier(req)

  const [error, data] = await manageAsyncOps(BlogService.createBlog(value))

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const getBlogController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(BlogService.getBlogs(req.query))

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const updateBlogController = async (req, res, next) => {
  const value = fileModifier(req)

  const [error, data] = await manageAsyncOps(
    BlogService.updateBlog(value, req.params.id)
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const deleteBlogController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    BlogService.deleteBlog(req.params.id)
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

module.exports = {
  createBlogController,
  getBlogController,
  updateBlogController,
  deleteBlogController,
}
