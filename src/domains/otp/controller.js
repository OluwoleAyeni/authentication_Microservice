const OTP = require("./model")
const generateOTP = require("./../../util/generateOTP")
const generateOTP = require("./../../util/generateOTP")
const sendEmail = require ("./../../util/sendEmail")
const {hashData, veriifyHashedData} = require("./../../util/hashData")
const {AUTH_EMAIL} = process.env

// Verify OTP
const verifyOTP = async ({email, otp}) => {
    try {
        if (!(email && otp)) {
            throw Error ("Provide Value for email, OTP")
        }

        // ensure an OTP record exist for user 
        const matchedOTPRecord = await OTP.findOne({
            email
        })

        if (!matchedOTPRecord){
            throw error ("No otp records found")
        }

        // if a match exist, check if it as expired
        const {expiresAT} = matchedOTPRecord
        if (expiresAT < Date.now()){
            await OTP.deleteOne({email})
            throw Error ("code has expired. request for a new one")
        }

        // not expired yet, verify value 
        const hashedOTP = matchedOTPRecord.otp
        const validOTP = await veriifyHashedData (otp, hashedOTP); 
        return validOTP
    } catch (error) {
        throw error
    }
}


// send an OTP
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

// delete an OTP 
const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({email})
    } catch (error) {
        throw error
    }
}
module.exports = {sendOTP, verifyOTP, deleteOTP}