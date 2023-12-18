const { default: mongoose } = require("mongoose")
const { BookingRepository } = require("./booking.repository")
const { queryConstructor, AlphaNumeric } = require("../../utils")
const { BookingMessage, BookingMessages } = require("./booking.message")
const {
  TransactionRepository,
} = require("../transaction/transaction.repository")

class BookingService {
  static async createBooking(payload) {
    const {
      userId,
      status,
      isConfirmed,
      subscriptionId,
      bookingDate,
      transactionId,
      ...rest
    } = payload

    const transaction = await TransactionRepository.fetchOne({
      userId: userId,
    })

    if (!transaction) return { success: false, msg: `transaction not found` }

    let randomGen
    let duplicateRandomGen

    // Keep generating a new randomGen until it doesn't collide with duplicateRandomGen
    do {
      randomGen = AlphaNumeric(7, "number")

      duplicateRandomGen = await BookingRepository.fetchOne({
        bookingId: randomGen,
      })
    } while (duplicateRandomGen)

    const duplicateBooking = await BookingRepository.fetchOne({
      transaction: transaction._id,
    })

    if (duplicateBooking)
      return { success: false, msg: BookingMessages.DUPLICATE }

    const booking = await BookingRepository.create({
      ...rest,
      bookingId: `#${randomGen}`,
      userId,
      status,
      isConfirmed,
      subscriptionId,
      bookingDate,
      bookingId,
      transactionId,
    })

    if (!booking._id)
      return { success: false, msg: BookingMessages.CREATE_ERROR }

    return { success: true, msg: BookingMessages.CREATE_SUCCESS }
  }

  static async fetchBooking(payload, locals) {
    const { error, params, limit, skip, sort } = queryConstructor(
      payload,
      "createdAt",
      "Booking"
    )

    if (error) return { success: false, msg: error }

    const booking = await BookingRepository.fetchFiles({
      ...params,
      limit,
      skip,
      sort,
    })

    if (booking.length < 1)
      return { success: true, msg: BookingMessage.NONE_FOUND, data: [] }

    return {
      success: true,
      msg: BookingMessage.FETCH_SUCCESS,
      data: booking,
    }
  }

  static async updateBookingService(id, payload) {
    delete payload.email

    const booking = await BookingRepository.fetchOne({
      _id: new mongoose.Types.ObjectId(id),
    })

    if (!booking._id)
      return { success: false, msg: BookingMessages.ORDER_ERROR }

    await BookingRepository.updateOrder(id, payload)

    return {
      success: true,
      msg: BookingMessages.UPDATE_SUCCESS,
    }
  }
}

module.exports = { BookingService }
