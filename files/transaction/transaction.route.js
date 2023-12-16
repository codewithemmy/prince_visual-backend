const transactionRoute = require("express").Router()
const { checkSchema } = require("express-validator")
const { validate } = require("../../validations/validate")

const {
  getTransactionController,
  initiateStripePaymentController,
  stripeWebHookController,
} = require("./controller/transaction.controller")
const { isAuthenticated } = require("../../utils")

transactionRoute.get("/", getTransactionController)
transactionRoute.post("/stripe-webhook", stripeWebHookController)

transactionRoute.use(isAuthenticated)

transactionRoute.post("/initiate", initiateStripePaymentController)

//routes
module.exports = transactionRoute
