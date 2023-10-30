const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    用户名: {
        type: String,
        ref: 'User',
    },
    包裹數量: {
        type: String,
    },
    Ship_Date: {
        type: Date,
    },
    費用: {
        type: Number,
    },
    餘額: {
        type: Number,
        ref: 'User',
    },
    Recipient: {
        type: String,
    },
    Dimension: {
        type: Number,
    },
    Weight: {
        type: Number,
    },
    Zone: {
        type: String,
    },
    Service: {
        type: String,
    },
    Order_Date: {
        type: Date,
    },
    状态: {
        type: String,
    },
})

module.exports = mongoose.model('Order', UserSchema)