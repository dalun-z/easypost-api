const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.error("MongoDB connection error: ", err);
    });
}

module.exports = connectDB