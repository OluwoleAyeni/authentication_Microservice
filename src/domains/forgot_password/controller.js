const User = require("./../user/model")
const {sendOTP, verifyOTP, deleteOTP} = require ("./../otp/controller")
const {hashData} = require("./../../util/hashData")

const resetUserPassword = async ({ email, otp, newPassword}) => {
    try {
        const validOTP = await verifyOTP ({ email, otp})
        if (!validOTP) {
            throw error("invalid code passed. check your inbox")
        }

        // update user recored with new password
        if (newPassword.lenght < 8) {
            throw an error ("Password is too short")
        }
        const hashedNewPassword = await hashData (newPassword)
        await User.updateOne ({email}, {password: hashedNewPassword})
        await deleteOTP
        return
    } catch (error) {
        throw error
    }
}

const sendPasswordResetOTPEmail = async (email) => {
    try {
        // check if an account exist
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            throw Error ("There's no account for the provided email")
        }

        if (!existingUser.verified) {
            throw Error ("Email hasn't been verified yet. check your inbox")
        }

        const optDetails = {
            email, 
            subject, 
            message: "Enter the code below to reset your password.",
            duration: 1
        }

        const createdOTP = await sendOTP(otpDetails)
        return createdOTP
    } catch (error) {
        throw Error
    }
}

module.exports = {sendPasswordResetOTPEmail, resetUserPassword}