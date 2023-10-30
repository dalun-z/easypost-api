const Order = require('../models/Order')
const { StatusCodes } = require('http-status-codes')

const createOrder = async (req, res) => {
    try {

    } catch (err) {
        console.error('Error during creating order', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Creating order failed' });
    }
}