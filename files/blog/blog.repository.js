const { Blog } = require("./blog.model")
const mongoose = require("mongoose")

class BlogRepository {
  static async create(payload) {
    return await Blog.create(payload)
  }

  static async findPBlogWithParams(blogPayload, select) {
    return await Blog.find({ ...blogPayload }).select(select)
  }

  static async findSingleBlogWithParams(blogPayload, select) {
    const blog = await Blog.findOne({ ...blogPayload }).select(select)

    return blog
  }

  static async validateBlog(blogPayload) {
    return Blog.exists({ ...blogPayload })
  }

  static async findAllBlogParams(blogPayload) {
    const { limit, skip, sort, ...restOfPayload } = blogPayload

    const blog = await Blog.find({ ...restOfPayload })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    return blog
  }

  static async updateBlogDetails(id, params) {
    return Blog.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $push: { ...params } } //returns details about the update
    )
  }

  static async updateBlogProfile(payload, params) {
    return Blog.findOneAndUpdate({ ...payload }, { $set: { ...params } })
  }

  static async updateBlogById(id, params) {
    return await Blog.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { ...params } }
    )
  }
  static async deleteBlogById(id) {
    return await Blog.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    })
  }
}

module.exports = { BlogRepository }
