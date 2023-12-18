const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    subscriptionId: {
      type: mongoose.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
    transactionId: { type: String },
    amount: {
      type: Number,
      required: true,
    },
    bookDate: { type: Date },
    channel: {
      type: String,
      required: true,
      enum: ["stripe", "other"],
      default: "stripe",
    },
    status: {
      type: String,
      // enum: ["pending", "paid", "failed", "open", "unpaid", "canceled"],
      default: "pending",
    },
    paymentFor: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    currency: {
      type: String,
    },
    metaData: String,
  },
  { timestamps: true }
)

const transaction = mongoose.model(
  "Transaction",
  TransactionSchema,
  "transaction"
)

module.exports = { Transaction: transaction }
