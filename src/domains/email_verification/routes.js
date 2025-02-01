const express = require("express")
const router = express.Router
const { sendVerificationOTPEmail } = require("./controller")

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