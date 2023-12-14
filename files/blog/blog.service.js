const { default: mongoose } = require("mongoose")
const { queryConstructor } = require("../../utils")
const { BlogRepository } = require("./blog.repository")
const { LIMIT, SKIP, SORT } = require("../../constants")
const { BlogFailure, BlogSuccess } = require("./blog.messages")

class BlogService {
  static async createBlog(payload) {
    const { body, image } = payload

    const validateBlog = await BlogRepository.validateBlog({
      header: body.header,
    })

    if (validateBlog) return { success: false, msg: BlogFailure.TITLE_EXIST }
    const blog = await BlogRepository.create({
      photo: image,
      ...body,
    })

    if (!blog) return { success: false, msg: BlogFailure.CREATE }

    return {
      success: true,
      msg: BlogSuccess.CREATE,
    }
  }

  static async updateBlog(payload, blogId) {
    const { image, body } = payload

    const blog = await BlogRepository.updateBlogById(blogId, {
      image,
      ...body,
    })

    if (!blog) return { success: false, msg: BlogFailure.UPDATE }

    return { success: true, msg: BlogSuccess.UPDATE }
  }

  static async getBlogs(payload) {
    const { error, params, limit, skip, sort } = queryConstructor(
      payload,
      "createdAt",
      "Blog"
    )
    if (error) return { success: false, msg: error }

    const blogs = await BlogRepository.findAllBlogParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (blogs.length < 1)
      return { success: true, msg: BlogFailure.FETCH, data: [] }

    return { success: true, msg: BlogSuccess.FETCH, data: blogs }
  }

  static async deleteBlog(blogId) {
    const blog = await BlogRepository.deleteBlogById(blogId)

    if (!blog) return { success: false, msg: BlogFailure.DELETE }

    return { success: true, msg: BlogSuccess.DELETE }
  }
}

module.exports = { BlogService }
