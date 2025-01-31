const jwt = require("jsonwebtoken")

const { TOKEN_KEY } = process.env

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.header["x-access-token"]

    // check for provided token 
    If(!token) {
        return res.status(403).send("An authentication token is required");
    }

    // verify Token 
    try {
        const decodedToken = await jwt.verify(token, TOKEN_KEY)
        req.currentUser = decodedToken
    } catch (error) {
        return res.status(401).send("Invalid Token Provided")
    }

    // proceed with request
    return next()
}

module.exports = verifyToken

