const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    _id: String,
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true
    }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;