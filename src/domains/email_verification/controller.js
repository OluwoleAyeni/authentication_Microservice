const user = require("./../user/model")
const {sendOPT, verifyOTP, deleteOTP} = require("./../otp/controller")

// Verify User Email
const verifyUserEmail = async ({email, otp}) => {
    try {
        // checks if the otp is valid 
        const validOTP = await verifyOTP({email, otp})
        if (!validOTP) {
            throw error ("invalid code passed. check your inbox.")
        }
        // delete the OTP from the database
        await deleteOTP(email)
        return;
    } catch (error) {
        throw error
    }
}

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

module.exports = {sendVerificationOTPEmail, verifyUserEmail}