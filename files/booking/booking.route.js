const bookingRoute = require("express").Router()
const { isAuthenticated, adminVerifier } = require("../../utils")
const {
  createBookingController,
  fetchBookingController,
  updateBookingController,
} = require("./booking.controller")

//authenticated routes go below here
bookingRoute.use(isAuthenticated)

bookingRoute
  .route("/")
  .post(createBookingController)
  .get(fetchBookingController)

bookingRoute.patch("/update/:id", updateBookingController)

//routes
module.exports = bookingRoute
