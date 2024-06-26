const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

// Constantes pour les filtres de taille
const SIZE_FILTERS = {
    S: "stockS",
    M: "stockM",
    X: "stockX",
    XL: "stockXl",
};

// Fonction pour supprimer un fichier d'image
const deleteImageFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) console.error("Échec de la suppression du fichier image:", err);
    });
};

// Ajouter un produit
router.post("/add", upload.array("images"), async (req, res) => {
    response(res, async () => {
        const { name, stockS, stockM, stockX, stockXl, price, description, categories } = req.body;

        const productId = uuidv4();

        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stockS,
            stockM,
            stockX,
            stockXl,
            price,
            description,
            categories,
            isActive: true,
            imageUrls: req.files,
            createdDate: new Date()
        });
        await product.save();

        res.json({ message: "L'enregistrement du produit a été effectué avec succès" });
    });
});

// Supprimer un produit par ID
router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;

        const product = await Product.findById(_id);
        if (product) {
            product.imageUrls.forEach(image => deleteImageFile(image.path));
            await Product.findByIdAndDelete(_id);
            res.json({ message: "L'enregistrement du produit a été supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    });
});

// Obtenir la liste des produits
router.post("/", async (req, res) => {
    response(res, async () => {
        const { pageNumber, pageSize, search } = req.body;

        const productCount = await Product.countDocuments({
            name: { $regex: search, $options: 'i' }
        });

        const products = await Product
            .find({ name: { $regex: search, $options: 'i' } })
            .sort({ name: 1 })
            .populate("categories")
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const totalPageCount = Math.ceil(productCount / pageSize);
        const model = {
            datas: products,
            pageNumber,
            pageSize,
            totalPageCount,
            isFirstPage: pageNumber === 1,
            isLastPage: totalPageCount === pageNumber
        };

        res.json(model);
    });
});

// Obtenir un produit par ID
router.post("/getById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        const product = await Product.findById(_id);
        res.json(product);
    });
});

// Mettre à jour un produit
router.post("/update", upload.array("images"), async (req, res) => {
    response(res, async () => {
        const { _id, name, stockS, stockM, stockX, stockXl, price, description, categories } = req.body;

        let product = await Product.findById(_id);

        if (product) {
            product.name = name.toUpperCase();
            product.stockS = stockS;
            product.stockM = stockM;
            product.stockX = stockX;
            product.stockXl = stockXl;
            product.price = price;
            product.description = description;
            product.categories = categories;
            product.imageUrls = [...product.imageUrls, ...req.files];

            await product.save();
            res.json({ message: "L'enregistrement du produit a été mis à jour avec succès" });
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    });
});

// Supprimer une image par ID de produit et index
router.post("/removeImageByProductIdAndIndex", async (req, res) => {
    response(res, async () => {
        const { _id, index } = req.body;

        let product = await Product.findById(_id);
        if (product) {
            if (product.imageUrls.length === 1) {
                res.status(500).json({ message: "Vous ne pouvez pas supprimer la dernière image du produit. Il doit y avoir au moins une image de produit." });
            } else {
                let image = product.imageUrls[index];
                product.imageUrls.splice(index, 1);
                await product.save();
                deleteImageFile(image.path);
                res.json({ message: "Image supprimée avec succès" });
            }
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    });
});

// Changer le statut actif du produit
router.post("/changeActiveStatus", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        let product = await Product.findById(_id);
        if (product) {
            product.isActive = !product.isActive;
            await product.save();
            res.json({ message: "Le statut du produit a été changé avec succès" });
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    });
});

// Obtenir tous les produits pour la page d'accueil avec des filtres
router.post("/getAllForHomePage", async (req, res) => {
    response(res, async () => {
        const { search, categoryId, priceFilter, sizeFilter } = req.body;

        let priceQuery = {};
        if (priceFilter !== "0") {
            const [minPrice, maxPrice] = priceFilter.split('-').map(parseFloat);
            priceQuery = { price: { $gte: minPrice, $lte: maxPrice } };
        }

        let sizeQuery = {};
        if (sizeFilter && SIZE_FILTERS[sizeFilter]) {
            sizeQuery = { [SIZE_FILTERS[sizeFilter]]: { $gt: 0 } };
        }

        const products = await Product.find({
            isActive: true,
            categories: { $regex: categoryId, $options: 'i' },
            name: { $regex: search, $options: 'i' },
            ...priceQuery,
            ...sizeQuery
        })
            .sort({ name: 1 })
            .populate("categories");

        res.json(products);
    });
});

// Obtenir les produits récents pour la page d'accueil
router.post("/getAllForHome", async (req, res) => {
    response(res, async () => {
        const products = await Product.find({ isActive: true })
            .sort({ createdDate: -1 })
            .limit(4);

        res.json(products);
    });
});

module.exports = router;
