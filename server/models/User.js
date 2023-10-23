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
        required: [true, 'Please enter amount'],
        default: 0,
    },
    
})