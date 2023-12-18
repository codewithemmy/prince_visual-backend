const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const { responseHandler } = require("../../core/response")
const { manageAsyncOps, fileModifier } = require("../../utils/index")
const { CustomError } = require("../../utils/errors")
const { BookingService } = require("./booking.service")

const createBookingController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    BookingService.createBooking(req.body)
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const fetchBookingController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    BookingService.fetchBooking(req.query, res.locals.jwt)
  )

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

const updateBookingController = async (req, res, next) => {
  const [error, data] = await manageAsyncOps(
    BookingService.updateBookingService(
      req.params.id,
      req.body,
      res.locals.jwt._id
    )
  )

  if (error) return next(error)

  if (!data.success) return next(new CustomError(data.msg, BAD_REQUEST, data))

  return responseHandler(res, SUCCESS, data)
}

module.exports = {
  createBookingController,
  fetchBookingController,
  updateBookingController,
}
