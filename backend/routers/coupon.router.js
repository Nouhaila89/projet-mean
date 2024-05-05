const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon");
const {v4:uuidv4} = require("uuid");
const response = require("../services/response.service");

router.post("/add", async (req, res)=> {
    response(res, async()=>{
        const {name, discountRate} = req.body;
        
        const checkName = await Coupon.findOne({name: name});
        if (checkName != null) {
            res.status(403).json({message: "Bu Kupon adı daha önce kullanılmış"});
        } else {
            const coupon = new Coupon({
                _id: uuidv4(),
                name: name,
                discountRate: discountRate
            });
    
            await coupon.save();
            res.json({message: "Kupon kaydı başarıyla tamamlandı"}); 
        }
    })
});

router.post("/removeById", async (req, res)=> {
    response(res, async()=>{
        const {_id} = req.body;
        await Coupon.findByIdAndDelete(_id);
        res.json({message: "Kupon kaydı başarıyla silindi"});
    })
});

router.post("/update", async (req, res)=> {
    response(res, async()=>{
        const {_id,name,discountRate} = req.body;
        const coupon = await Coupon.findOne({_id: _id});
        
        if (coupon.name != name) {
            const checkName = await Coupon.findOne({name: name});
            if (checkName != null) {
                res.status(403).json({message: "Bu Kupon adı daha önce kullanılmış"});
            } else {
                coupon.name = name;
                coupon.discountRate = discountRate;
                
                await Coupon.findByIdAndUpdate(_id, coupon);
                res.json({message: "Kupon kaydı başarıyla güncellendi"});
            }
        }else{
            return res.status(403).json({ message: "Yeni Kupon adı mevcut Kupon adıyla aynı olamaz" });
        }
    })
});

router.get("/", async (req, res)=> {
    response(res, async()=>{
        const coupon = await Coupon.find().sort({name: 1});
        res.json(coupon);
    })
});

module.exports = router;