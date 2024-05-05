const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    _id: String,
    name: String,
    discountRate: Number
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;