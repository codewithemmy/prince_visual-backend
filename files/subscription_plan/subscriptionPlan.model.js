const mongoose = require("mongoose")

const subscriptionPlanSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    image: String,
    subTitle: String,
    description: String,
    benefits: [String],
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const subscriptionPlan = mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema,
  "subscriptionPlan"
)

module.exports = { SubscriptionPlan: subscriptionPlan }
