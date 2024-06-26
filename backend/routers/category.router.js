const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");
const response = require("../services/response.service");

// Route pour ajouter une catégorie
router.post("/add", async (req, res) => {
    response(res, async () => {
        const { name } = req.body;
        
        const checkName = await Category.findOne({ name: name });
        if (checkName != null) {
            return res.status(403).json({ message: "Ce nom de catégorie a déjà été utilisé" });
        } else {
            const category = new Category({
                _id: uuidv4(),
                name: name
            });
    
            await category.save();
            return res.json({ message: "Enregistrement de la catégorie réussi" }); 
        }
    });
});

// Route pour supprimer une catégorie par ID
router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        const category = await Category.findByIdAndDelete(_id);
        if (category) {
            return res.json({ message: "Catégorie supprimée avec succès" });
        } else {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
    });
});

// Route pour mettre à jour une catégorie
router.post("/update", async (req, res) => {
    response(res, async () => {
        const { _id, name } = req.body;
        const category = await Category.findOne({ _id: _id });
        
        if (category) {
            if (category.name !== name) {
                const checkName = await Category.findOne({ name: name });
                if (checkName != null) {
                    return res.status(403).json({ message: "Ce nom de catégorie a déjà été utilisé" });
                } else {
                    category.name = name;
                    await Category.findByIdAndUpdate(_id, category);
                    return res.json({ message: "Catégorie mise à jour avec succès" });
                }
            } else {
                return res.status(403).json({ message: "Le nouveau nom de catégorie ne peut pas être le même que le nom de catégorie existant" });
            }
        } else {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
    });
});

// Route pour obtenir toutes les catégories
router.get("/", async (req, res) => {
    response(res, async () => {
        const categories = await Category.find().sort({ name: 1 });
        return res.json(categories);
    });
});

module.exports = router;
