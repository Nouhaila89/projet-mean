const express = require("express");
const router = express.Router();
const response = require("../services/response.service");
const Basket = require("../models/basket");
const {v4: uuidv4} = require("uuid");
const Product = require("../models/product");

router.post("/add", async (req, res) => {
    response(res, async () => {
        const { userId, productId, price, quantity, selectedSize } = req.body;

        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Ürün bulunamadı." });
        }

        // Stok kontrolü
        switch (selectedSize) {
            case 'S':
                if (product.stockS === 0 || product.stockS < quantity) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                break;
            case 'M':
                if (product.stockM === 0 || product.stockM < quantity) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                break;
            case 'X':
                if (product.stockX === 0 || product.stockX < quantity) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                break;
            case 'XL':
                if (product.stockXl === 0 || product.stockXl < quantity) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                break;
            default:
                return res.status(400).json({ message: "Geçersiz beden seçimi." });
        }

        let existingBasket = await Basket.findOne({ userId: userId, productId: productId, selectedSize: selectedSize });

        if (existingBasket) {
            existingBasket.quantity += quantity;
            await existingBasket.save();
        } else {
            let basket = new Basket();
            basket._id = uuidv4();
            basket.userId = userId;
            basket.productId = productId;
            basket.selectedSize = selectedSize;
            basket.price = price;
            basket.quantity = quantity;
            await basket.save();
        }

        // Stok güncelleme
        switch (selectedSize) {
            case 'S':
                product.stockS -= quantity;
                break;
            case 'M':
                product.stockM -= quantity;
                break;
            case 'X':
                product.stockX -= quantity;
                break;
            case 'XL':
                product.stockXl -= quantity;
                break;
        }

        await product.save();

        res.json({ message: "Ürün başarıyla sepete eklendi!" });
    });
});

router.post("/updateQuantity", async (req, res) => {
    response(res, async () => {
        const { _id, quantity } = req.body;

        let basket = await Basket.findById(_id);

        if (!basket) {
            return res.status(404).json({ message: "Sepet bulunamadı." });
        }

        let product = await Product.findById(basket.productId);

        if (!product) {
            return res.status(404).json({ message: "Ürün bulunamadı." });
        }

        // Yeni adet değeri ile stok kontrolü
        let newStock = 0;
        switch (basket.selectedSize) {
            case 'S':
                newStock = product.stockS + basket.quantity - quantity;
                if (newStock < 0) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                product.stockS = newStock;
                break;
            case 'M':
                newStock = product.stockM + basket.quantity - quantity;
                if (newStock < 0) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                product.stockM = newStock;
                break;
            case 'X':
                newStock = product.stockX + basket.quantity - quantity;
                if (newStock < 0) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                product.stockX = newStock;
                break;
            case 'XL':
                newStock = product.stockXl + basket.quantity - quantity;
                if (newStock < 0) {
                    return res.status(400).json({ message: "Üzgünüz, bu bedende yeterli stok bulunmamaktadır." });
                }
                product.stockXl = newStock;
                break;
            default:
                return res.status(400).json({ message: "Geçersiz beden seçimi." });
        }

        await product.save();

        // Sepetin adetini güncelle
        basket.quantity = quantity;
        await basket.save();

        res.json({ message: "Adet başarıyla güncellendi." });
    });
});


router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;

        let basket = await Basket.findById(_id);

        if (!basket) {
            return res.status(404).json({ message: "Sepet bulunamadı." });
        }

        let product = await Product.findById(basket.productId);

        if (!product) {
            return res.status(404).json({ message: "Ürün bulunamadı." });
        }

        // İlgili bedene göre stok miktarını artır
        switch (basket.selectedSize) {
            case 'S':
                product.stockS += basket.quantity;
                break;
            case 'M':
                product.stockM += basket.quantity;
                break;
            case 'X':
                product.stockX += basket.quantity;
                break;
            case 'XL':
                product.stockXl += basket.quantity;
                break;
            default:
                break;
        }

        await Product.findByIdAndUpdate(basket.productId, product);
        await Basket.findByIdAndDelete(_id);

        res.json({ message: "Ürünü sepetten başarıyla kaldırdık!" });
    });
});




router.post("/", async(req, res)=> {
    response(res, async()=>{
        const {userId} = req.body;

        const baskets = await Basket.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ]);

        res.json(baskets);
    });
});

router.post("/getCount",async(req, res)=> {
    response(res, async()=> {
        const {userId} = req.body;
        const count = await Basket.find({userId: userId}).count();
        res.json({count: count});
    });
});

module.exports = router;