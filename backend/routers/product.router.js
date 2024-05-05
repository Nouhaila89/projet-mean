const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

//Ürün Ekleme
router.post("/add",upload.array("images"), async(req, res)=>{
    response(res, async()=> {
        const {name, stockS, stockM, stockX, stockXl, price, description, categories} = req.body;

        const productId = uuidv4();

        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stockS: stockS,
            stockM: stockM,
            stockX: stockX,
            stockXl: stockXl,
            price: price,
            description: description,
            categories: categories,
            isActive: true,
            imageUrls: req.files,
            createdDate: new Date()
        });
        await product.save();

        res.json({message: "Ürün kaydı başarıyla tamamlandı"})
    })
});

//Ürün Silme
router.post("/removeById", async(req,res)=>{
    response(res, async()=>{
        const {_id} = req.body;

        const product = await Product.findById(_id);
        for(const image of product.imageUrls){
            fs.unlink(image.path, ()=> {});
        }

        await Product.findByIdAndDelete(_id);
        res.json({message: "Ürün kaydı başarıyla silindi"});
    });
});

//Ürün Listesi Getir
router.post("/", async(req, res)=> {
    response(res, async()=>{
        const {pageNumber, pageSize, search} = req.body;

        let productCount = await Product.find({
            $or: [
                {
                    name: {$regex: search, $options: 'i'}
                }
            ]
        }).count();

        let products = await Product
        .find({
            $or: [
                {
                    name: {$regex: search, $options: 'i'}
                }
            ]
        })
        .sort({name: 1})
        .populate("categories")
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

        let totalPageCount = Math.ceil(productCount / pageSize);
        let model = {
            datas: products,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPageCount: totalPageCount,
            isFirstPage: pageNumber == 1 ? true: false,
            isLastPage: totalPageCount == pageNumber ? true: false
        };

        res.json(model);
    })
});

//Ürün Id ye göre getir
router.post("/getById", async(req,res)=>{
    response(res, async()=>{
        const {_id} = req.body;
        let product = await Product.findById(_id);
        res.json(product);
    })
})

//Ürün Güncelleme
router.post("/update", upload.array("images"), async(req,res)=>{
    response(res, async()=>{
        const {_id, name, stockS, stockM, stockX, stockXl, price, description, categories} = req.body;
        
        let product = await Product.findById(_id);
        
        let imageUrls;
        imageUrls = [...product.imageUrls,...req.files]
        product = {
            name: name.toUpperCase(),
            stockS: stockS,
            stockM: stockM,
            stockX: stockX,
            stockXl: stockXl,
            price: price,
            imageUrls: imageUrls,
            description: description,
            categories: categories
        };
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürün kaydı başarıyla güncellendi"});
    });
});

//Ürün Resmi Sil
router.post("/removeImageByProductIdAndIndex", async(req, res)=>{
    response(res, async()=>{
        const {_id, index}= req.body;

        let product = await Product.findById(_id);
        if (product.imageUrls.length == 1) {
            res.status(500).json({message: "Son ürün resmini silemezsiniz En az 1 ürün resmi bulunmak zorundadır"});
        }else{
            let image = product.imageUrls[index];
            product.imageUrls.splice(index,1);
            await Product.findByIdAndUpdate(_id, product);
            fs.unlink(image.path, ()=>{});
            res.json({message: "Resim başarıyla kaldırıldı"});
        }
    })
})

// Ürünün Aktif/Pasif Durumu
router.post("/changeActiveStatus", async(req, res)=>{
    response(res, async()=>{
        const {_id}= req.body;
        let product = await Product.findById(_id);
        product.isActive = !product.isActive;
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürün durumu başarıyla değiştirildi"});
    })
})

router.post("/getAllForHomePage", async (req, res) => {
    response(res, async () => {
        const { search, categoryId, priceFilter, sizeFilter } = req.body;
        let products;

        let priceQuery = {};
        if (priceFilter !== "0") {
            const [minPrice, maxPrice] = priceFilter.split('-').map(parseFloat);
            priceQuery = { price: { $gte: minPrice, $lte: maxPrice } };
        }

        let sizeQuery = {};
        if (sizeFilter !== "") {
            let stockField;
            switch (sizeFilter) {
                case "S":
                    stockField = "stockS";
                    break;
                case "M":
                    stockField = "stockM";
                    break;
                case "X":
                    stockField = "stockX";
                    break;
                case "XL":
                    stockField = "stockXl";
                    break;
                default:
                    break;
            }
            sizeQuery = { [stockField]: { $gt: 0 } };
        }

        products = await Product
            .find({
                isActive: true,
                categories: { $regex: categoryId, $options: 'i' },
                $or: [{ name: { $regex: search, $options: 'i' } }],
                ...priceQuery,
                ...sizeQuery
            })
            .sort({ name: 1 })
            .populate("categories");

        res.json(products);
    });
});

router.post("/getAllForHome", async(req,res)=>{
    response(res, async()=>{
        let products;
        products = await Product
            .find({
                isActive: true,
            })
            .sort({createdDate: -1}) 
            .limit(4); 

        res.json(products);
    })
})


module.exports = router;