const { default: mongoose, mongo } = require("mongoose")
const { v4: uuidv4 } = require("uuid")
const { StripePaymentService } = require("../../../providers/stripe/stripe")
const {
  TransactionFailure,
  TransactionSuccess,
  TransactionMessages,
} = require("../transaction.messages")
const { UserRepository } = require("../../user/user.repository")
const {
  SubscriptionPlanRepository,
} = require("../../subscription_plan/subscriptionPlan.repository")

const { TransactionRepository } = require("../transaction.repository")
const { queryConstructor } = require("../../../utils")

class TransactionService {
  static paymentProvider

  static async getConfig() {
    this.paymentProvider = new StripePaymentService()
  }

  static async initiateStripePayment(payload) {
    const { userId, amount, subscriptionId, currency } = payload

    await this.getConfig()

    const user = await UserRepository.findSingleUserWithParams({
      _id: new mongoose.Types.ObjectId(userId),
    })

    const subscription = await SubscriptionPlanRepository.fetchOne({
      _id: new mongoose.Types.ObjectId(subscriptionId),
    })

    if (!user) return { success: false, msg: `user not found` }
    if (!subscription)
      return { success: false, msg: `subscription id not found` }

    const paymentIntent = await this.paymentProvider.initiatePaymentIntent({
      amount,
      currency,
    })

    if (!paymentIntent)
      return { success: false, msg: `unable to create payment intent` }

    await TransactionRepository.create({
      subscriptionId,
      userId,
      currency,
      amount,
      transactionId: paymentIntent.transactionId,
    })

    return {
      success: true,
      msg: TransactionSuccess.INITIATE,
      data: paymentIntent,
    }
  }

  static async getTransactionService(payload, locals) {
    const { error, params, limit, skip, sort } = queryConstructor(
      payload,
      "createdAt",
      "Transaction"
    )
    if (error) return { success: false, msg: error }

    const transaction = await TransactionRepository.fetchTransactionsByParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (transaction.length < 1)
      return { success: false, msg: `you don't have any transaction history` }

    return {
      success: true,
      msg: `transaction fetched successfully`,
      data: transaction,
    }
  }

  static async stripeWebhookService(event) {
    // Handle the event
    switch (event.type) {
      case "payment_intent.canceled":
        const paymentIntentCanceled = event.data.object

        await TransactionRepository.updateTransactionDetails(
          {
            transactionId: paymentIntentCanceled.id,
          },
          {
            currency: paymentIntentCanceled.currency,
            amount: paymentIntentCanceled.amount,
            status: "canceled",
          }
        )
        break

      case "payment_intent.payment_failed":
        const paymentIntentPaymentFailed = event.data.object
        await TransactionRepository.updateTransactionDetails(
          {
            transactionId: paymentIntentPaymentFailed.id,
          },
          {
            currency: paymentIntentPaymentFailed.currency,
            amount: paymentIntentPaymentFailed.amount,
            status: "failed",
          }
        )
        break
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object
        await TransactionRepository.updateTransactionDetails(
          {
            transactionId: paymentIntentSucceeded.id,
          },
          {
            currency: paymentIntentSucceeded.currency,
            amount: paymentIntentSucceeded.amount,
            status: "success",
          }
        )
        break
      default:
        break
    }
    return { success: true, msg: `payment successfully verified` }
  }
}

module.exports = { TransactionService }
