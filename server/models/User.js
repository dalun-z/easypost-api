const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    fullName: {
        type: String,
        required: [true, 'Please provide full name or company name'],
    },
    region: {
        type: String,
        required: [true, 'Please provide region'],
    },
    balance: {
        type: Int32,
        default: 0,
    },
    pre_shipment: {
        type: Int32,
        default: 0,
    },
    pre_transit: {
        type: Int32,
        default: 0,
    },
    in_transit: {
        type: Int32,
        default: 0,
    },
    out_for_delivery: {
        type: Int32,
        default: 0,
    },
    delivered: {
        type: Int32,
        default: 0,
    },
    ok_to_pickup: {
        type: Int32,
        default: 0,
    },
    return_to_sender: {
        type: Int32,
        default: 0,
    },
    failure: {
        type: Int32,
        default: 0,
    },
    cancelled: {
        type: Int32,
        default: 0,
    },
    error: {
        type: Int32,
        default: 0,
    },
})


module.exports = mongoose.model('User', UserSchema)