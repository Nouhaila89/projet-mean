const mongoose = require("mongoose");

const produtSchema = new mongoose.Schema({
    _id: String,
    name: String,
    imageUrls: Array,
    stock: Number,
    price: Number,
    description: String,
    createdDate: Date,
    isActive: Boolean,
    categories: [{type: String, ref: "Category"}]
});

const Product = mongoose.model("Product", produtSchema);

module.exports = Product;