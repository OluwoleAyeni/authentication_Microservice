const express = require("express")
const router = express.Router
const { sendVerificationOTPEmail, verifyUserEmail } = require("./controller")

// verify the email OTP
router.post("/verify", async (req, res) => {
    try {
        let { email, opt } = req.body 
        if (!(email && opt)) throw error("Empty otp details are not allowed")

        await verifyUserEmail({email, otp})
        res.status(200).json({email, verified: true})
    } catch (error) {
        res.status(400).send(error.message)
    }
  }) 

// requesting for email verification 
router.post("/", async() =>{
    try {
        const {email} = req.body
        if (!email) throw Error ("An email is required!")

        const ccreatedEmailVerificationOTP = await
        sendVerificationOTPEmail(email)
        res.status(200).json(ccreatedEmailVerificationOTP)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router