const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { email: user.email }, token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Registration failed' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials');
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials');
        }

        const token = user.createJWT();

        const userData = {
            _id: user._id,
            email: user.email,
            role: user.role,
        }

        res.status(StatusCodes.OK).json({ user: userData, token });
    } catch (error) {
        console.error('Error during login:', error);
        if (error instanceof BadRequestError || error instanceof UnauthenticatedError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Login failed' });
        }
    }
}

module.exports = {
    register,
    login,
}