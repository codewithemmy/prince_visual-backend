const adminRoute = require("express").Router()
const {
  adminSignUpController,
  adminLogin,
  getAdminController,
} = require("./admin.controller")

//admin route
adminRoute.route("/").post(adminSignUpController)
adminRoute.route("/login").post(adminLogin)
adminRoute.route("/profile").get(getAdminController)

module.exports = adminRoute
