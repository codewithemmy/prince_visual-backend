const userRoute = require("../files/user/user.route")
const authRoute = require("../files/auth/auth.route")
const photoRoute = require("../files/photo/photo.route")

const notificationRoute = require("../files/notification/notification.route")
const adminRoute = require("../files/admin/admin.routes")
const blogRoute = require("../files/blog/blog.route")
const subscriptionPlansRoute = require("../files/subscription_plan/subscriptionPlan.routes")
const transactionRoute = require("../files/transaction/transaction.route")
const bookingRoute = require("../files/booking/booking.route")
const videoRoute = require("../files/video/video.route")

const routes = (app) => {
  const base_url = "/api/v1"

  app.use(`${base_url}/user`, userRoute)
  app.use(`${base_url}/auth`, authRoute)
  app.use(`${base_url}/notification`, notificationRoute)
  app.use(`${base_url}/photo`, photoRoute)
  app.use(`${base_url}/admin`, adminRoute)
  app.use(`${base_url}/blog`, blogRoute)
  app.use(`${base_url}/subscription`, subscriptionPlansRoute)
  app.use(`${base_url}/transaction`, transactionRoute)
  app.use(`${base_url}/booking`, bookingRoute)
  app.use(`${base_url}/video`, videoRoute)
}

module.exports = routes
