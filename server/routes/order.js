const express = require('express')
const router = express.Router()

const {
    createOrder,
} = require('../controllers/order')

router.post('/createorder', createOrder)

module.exports = router