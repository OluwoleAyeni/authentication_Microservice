const User = require("./model")
const { hashData, veriifyHashedData } = require("./../../util/hashData")
const createToken = require("./../../util/createToken")

const authenticateUser = async (data) => {
    try {
        const { email, password } = data

        const fetchedUser = await User.findOne({
            email
        })

        if (!fetchedUser) {
            throw Error("Invalid Credential entered!")
        }

        // check if the Password is the same. 
        const hashedPassword = fetchedUser.password
        const passwordMatch = await veriifyHashedData(password, hashedPassword)

        if (!passwordMatch) {
            throw error("invalid password entered!")
        }

        // Create a user token 
        const tokenData = { userId: fetchedUser._id, email }
        const token = await createToken(tokenData)

        // assign user token
        fetchedUser.token = token
        return fetchedUser
    } catch (error) {
        throw error
    }
}

const createNewUser = async (data) => {
    try {
        const { name, email, password } = data

        const existingUser = await User.findone({ email })

        if (existingUser) {
            throw Error("user with the provided email already exist")
        }

        const hashPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        const createdUser = await newUser.save()
        return createdUser;
    } catch (error) {
        throw error
    }
}

module.exports = { createNewUser, authenticateUser }