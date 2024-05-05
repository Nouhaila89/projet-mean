const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");
const {v4: uuidv4} = require("uuid");
const response = require("../services/response.service");

//Ürün Ekleme
router.post("/add", async(req, res)=>{
    response(res, async()=> {
        const {name, description, productId} = req.body;

        const reviewsId = uuidv4();

        let reviews = new Reviews({
            _id: reviewsId,
            name: name.toUpperCase(),
            description: description,
            createdDate: new Date(),
            productId: productId,
        });
        await reviews.save();

        res.json({message: "Yorumunuz başarıyla gönderildi"})
    })
});

router.get("/getAllReviews/:productId", async (req, res) => {
    const { productId } = req.params; 

    response(res, async () => {
        let reviews;
        reviews = await Reviews
            .find({ productId: productId })
            .sort({ name: 1 });

        res.json(reviews);
    });
});




module.exports = router;