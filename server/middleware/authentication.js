const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')


const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication error')
    }
    console.log(authHeader)
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the job routes
        console.log(payload)

        req.user = { userId: payload.userId, name: payload.name }
        // same process :
        // const user = User.findById(payload.id).select('-password')
        // req.user = user
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authencation invalid')
    }
}

module.exports = auth