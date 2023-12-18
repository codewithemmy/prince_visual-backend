const { default: mongoose, mongo } = require("mongoose")
const { Booking } = require("./booking.model")
const { LIMIT, SKIP, SORT } = require("../../constants")

class BookingRepository {
  static async create(bookingPayload) {
    return Booking.create({ ...bookingPayload })
  }

  static async fetchOne(payload) {
    return Booking.findOne({ ...payload })
  }

  static async fetch(payload, select) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = payload

    return await Booking.find({
      ...restOfPayload,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(select)
  }

  static async updateBooking(id, params) {
    return Booking.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { ...params } },
      { new: true, runValidator: true }
    )
  }

  static async fetchFiles(payload, select) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = payload

    return await Booking.find(
      {
        ...restOfPayload,
      },
      { file: 1 }
    )
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(select)
  }
}

module.exports = { BookingRepository }
