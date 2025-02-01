const express = require("express")

const router = express.Router()

const userRoutes = require("./../domains/user")
const OTPRoutes = require("./../domains/otp")
const emailVerificationRoutes = require("./../domains/email_verification")
const forgotPasswordRoutes = require("./../domains/forgot_password")

router.use("/user", userRoutes)
router.use("/otp", OTPRoutes)
router.use("/email_Verification", emailVerificationRoutes)
router.use("/forgot_password", forgotPasswordRoutes)

module.exports = router 