const bcrypt = require("bcrypt")

const hashData = async (DataTransfer, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds)
        return hashedData
    } catch (error) {
        throw error;
    }
}

// Verify hashed data

const veriifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt.compare(unhashed, hashed)
        return match
    } catch (error) {
        throw Error
    }
}

module.exports = { hashData, veriifyHashedData } 