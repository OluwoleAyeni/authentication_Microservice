const nodemailer = require("nodemailer")

// Set up an email lesson 6 
const {AUTH_EMAIL, AUTH_PASSWORD} = process.env 
let transporter = nodemailer.createTransport({
    host: "XXX",
    auth: {
        user: AUTH_EMAIL, 
        pass: AUTH_PASSWORD,
    }, 
})

// test transporter 
transporter.verify((error, success) => {
    if (error) {
        console.log (error)
    } else {
        console.log ("Ready for message")
        console.log(success)
    }
})

// send the actual email
const sendEmail = async (mailOptions) =>{
    try {
       await transporter.sendMail(mailOptions)
       return 
    } catch (error) {
        throw error
    }
}

module.exports = sendEmail