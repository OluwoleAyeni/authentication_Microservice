const express = require("express")
const router = express.Router()
const { sendPasswordResetOTPEmail, resetUserPassword} = require("./controller")

// verify the opt for the password reset
router.post("/reset", async (req, res) => {
    try {
        let{email, otp, newPassword} = req.body
        if (!(email && otp && newPassword))
            throw Error ("empty credentials are not allowed")
        
        await resetUserPassword ({email, otp, newPassword})
        res.status(200).json({email, passwordreset: true})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Password reset request
router.post("/", async (req, res) => {
    try {
        const {email} = req.body
        if (!email) throw error ("an email is required")

        const createdPasswordResetOTP = await sendPasswordResetOTPEmail(email)
        res.status(200).json(createdPasswordResetOTP)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router 