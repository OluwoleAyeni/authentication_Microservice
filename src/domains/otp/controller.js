const OTP = require("./model")
const generateOTP = require("./../../util/generateOTP")
const generateOTP = require("./../../util/generateOTP")
const sendEmail = require ("./../../util/sendEmail")
const {hashedOTP} = require("./../../util/hashData")
const {AUTH_EMAIL} = process.env

const sendOTP = async ({email, subject, message, duration =1}) => {
    try {
        if (!(email && subject && message)) {
            throw Error ("provide values for email, subject, message")
        }

        // clear an old record 
        await OTP.deleteOne({email})

        // generate pin 
        const generateedOTP = await generateOTP();

        // send email
        const mailOptions = {
            from: AUTH_EMAIL, 
            to: email, 
            subject, 
            html: `<p>${message}</p><p style= "color: tomato;
            font-size:25px;letter-spacing:2px;"><b>$
            {generatedOTP}</b></p><p>This code <b>expires in $
            {duration} hour(s)</b>.</p>`, 
        }

        await sendEmail(mailOptions)

        // save otp record
        const hashedOTP = await hashedOTP(generatedOTP)
        const newOTP = await new OTP({
            email, 
            opt: hashedOTP
            createdAT: Date.now(), 
            expiresAT: Date.now() + 3600000 * +duration,
        })

        const createdOTPRecord = await newOTP.save()
        return createdOTPRecord
    } catch (error) {
        throw error
    }
}

module.exports = {sendOTP}