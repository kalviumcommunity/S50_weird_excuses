const mongoose = require("mongoose");
require('dotenv').config();

const URI = process.env.MongoDB_URL;

const connect_database = async () => {
    try {
        await mongoose.connect(URI);
        console.log("db connected");
    } catch (error) {
        console.log("error connecting db:", error);
    }
};

module.exports = connect_database;

