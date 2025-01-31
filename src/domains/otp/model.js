const mongoose = require("mongoose")
const schema = mongoose.Schema

const OTPSchema = new Schema ({
    email: {type: String, unique: true}, 
    otp: String, 
    createdAt: Date, 
    expiresAT: Date
})

const OTP = mongoose.model ("OTP", OTPSchema)

module.exports = OTP