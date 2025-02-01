const express = require("express")

const router = express.Router()

const userRoutes = require("./../domains/user")
const OTPRoutes = require("./../domains/otp")
const emailVerificationRoutes = require("./../domains/email_verification")

router.use("/user", userRoutes)
router.use("/otp", OTPRoutes)
router.use("/email_Verification", emailVerificationRoutes)

module.exports = router 