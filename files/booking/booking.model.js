const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptionId: {
      type: mongoose.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },
    transactionId: {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    bookingDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["booked", "in-progress"],
      default: "in-progress",
    },
  },
  { timestamps: true }
)

const booking = mongoose.model("Booking", BookingSchema, "booking")

module.exports = { Booking: booking }
