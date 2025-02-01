const user = require("./../user/model")
const {sendOPT} = require("./../otp/controller")

const sendVerificationOTPEmail = async (email) => {
    try {
        // check if an account exist
        const existingUser = await User.findOne({email})
    if (!existingUser) {
            throw Error ("There is no account for the provided email")
        }

        const optDetails = {
            email, 
            subject: "Email Verification",
            message: "Verify your email with the code below", 
            duration: 1, 
        }

        const createdOTP = await sendOTP(optDetails)
        return createdOTP
    } catch (error) {
       throw error 
    }
}

module.exports = {sendVerificationOTPEmail}