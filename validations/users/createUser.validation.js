const { User } = require("../../files/user/user.model")

const createUser = {
  userName: {
    notEmpty: true,
    errorMessage: "userName cannot be empty",
  },
  email: {
    notEmpty: true,
    errorMessage: "email cannot be empty",
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
  password: {
    notEmpty: true,
    errorMessage: "password cannot be empty",
  },
}

module.exports = { createUser }
