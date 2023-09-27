const express = require("express");
const authRouter = express.Router();
const { login, refresh, logout } = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

authRouter.route("/").post(loginLimiter, login);

authRouter.route("/refresh").get(refresh);

authRouter.route("/logout").post(logout);

// authRouter.route("/resetPassword").post(passwordResetEmail);

module.exports = { authRouter };
