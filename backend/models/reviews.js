const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    createdDate: Date,
    productId: String
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;