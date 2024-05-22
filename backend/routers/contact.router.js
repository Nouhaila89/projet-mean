const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const {v4:uuidv4} = require("uuid");
const response = require("../services/response.service");

router.post("/add", async(req, res) =>{
    response(res, async()=>{
        const {name, email, message} = req.body;

        const contact = new Contact({
            _id: uuidv4(),
            name: name,
            email: email,
            message: message,
        });

        await contact.save();
        res.json({ message : "Mesajınız başarıyla ile gönderildi."});
    })
});

router.get("/", async(req, res)=>{
    response(res, async()=>{
        const contact = await Contact.find().sort({name: 1});
        res.json(contact);
    })
})

module.exports = router;