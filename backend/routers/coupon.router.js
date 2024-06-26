const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon");
const { v4: uuidv4 } = require("uuid");
const response = require("../services/response.service");

router.post("/add", async (req, res) => {
    response(res, async () => {
        const { name, discountRate } = req.body;
        
        const checkName = await Coupon.findOne({ name: name });
        if (checkName != null) {
            res.status(403).json({ message: "Ce nom de coupon a déjà été utilisé" });
        } else {
            const coupon = new Coupon({
                _id: uuidv4(),
                name: name,
                discountRate: discountRate
            });
    
            await coupon.save();
            res.json({ message: "Enregistrement du coupon réussi" }); 
        }
    });
});

router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        await Coupon.findByIdAndDelete(_id);
        res.json({ message: "Enregistrement du coupon supprimé avec succès" });
    });
});

router.post("/update", async (req, res) => {
    response(res, async () => {
        const { _id, name, discountRate } = req.body;
        const coupon = await Coupon.findOne({ _id: _id });
        
        if (coupon.name != name) {
            const checkName = await Coupon.findOne({ name: name });
            if (checkName != null) {
                res.status(403).json({ message: "Ce nom de coupon a déjà été utilisé" });
            } else {
                coupon.name = name;
                coupon.discountRate = discountRate;
                
                await Coupon.findByIdAndUpdate(_id, coupon);
                res.json({ message: "Enregistrement du coupon mis à jour avec succès" });
            }
        } else {
            return res.status(403).json({ message: "Le nouveau nom de coupon ne peut pas être le même que le nom de coupon existant" });
        }
    });
});

router.get("/", async (req, res) => {
    response(res, async () => {
        const coupon = await Coupon.find().sort({ name: 1 });
        res.json(coupon);
    });
});

module.exports = router;
