const mongoose = require('mongoose');

// ------------------------------------

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};
module.exports = DBConnect;