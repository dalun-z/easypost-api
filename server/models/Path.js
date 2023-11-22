const mongoose = require('mongoose')

const PathSchema = new mongoose.Schema({
    ID: {
        type: Number,
        unique: true,
        default: 1,
    },
    渠道名称: {
        type: String,
        required: [true, 'Please provide a valid Path Name'],
    },
    费率: {
        type: Number,
        required: [true, 'Please provide a valid Rate'],
    },
    CarrierID: {
        type: String,
        required: [true, 'Please provide a valid CarrierID'],
    },
    Carrier_Service: {
        type: String,
        required: [true, 'Please provide a valid Carrier_Service'],
    },
    签名: {
        type: String,
    },
    API_Key: {
        type: String,
        required: [true, 'Please provide a valid API_Key'],
    },
    Name : {
        type: String,
        required: [true, 'Please provide a valid Name'],
    },
    Street1: {
        type: String,
        required: [true, 'Please provide a valid street name'],
    },
    Street2: {
        type: String,
    },
    City: {
        type: String,
        required: [true, 'Please provide a valid City name'],
    },
    State: {
        type: String,
        required: [true, 'Please provide a valid State name'],
    },
    Zip_Code: {
        type: String,
        required: [true, 'Please provide a valid Zip_Code'],
    },
    Country: {
        type: String,
        required: [true, 'Please provide a valid Country name'],
    },
    Phone: {
        type: String,
        required: [true, 'Please provide a valid Phone'],
    },
});

// Middleware to automatically increment _id by 1 for new documents
PathSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastDocument = await this.constructor.findOne({}, {}, { sort: { ID: -1 } });
        if (lastDocument) {
            this.ID = lastDocument.ID + 1;
        }
    } catch (error) {
        return next(error);
    }

    next();
});

module.exports = mongoose.model('Path', PathSchema)