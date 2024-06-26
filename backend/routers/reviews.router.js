const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");
const {v4: uuidv4} = require("uuid");
const response = require("../services/response.service");

// Ajouter un commentaire
router.post("/add", async(req, res)=>{
    response(res, async()=> {
        const {nom, description, produitId} = req.body;

        const idCommentaire = uuidv4();

        let commentaire = new Reviews({
            _id: idCommentaire,
            nom: nom.toUpperCase(),
            description: description,
            dateCréation: new Date(),
            produitId: produitId,
        });
        await commentaire.save();

        res.json({message: "Votre commentaire a été envoyé avec succès"})
    })
});

// Obtenir tous les commentaires pour un produit
router.get("/getAllReviews/:productId", async (req, res) => {
    const { productId } = req.params; 

    response(res, async () => {
        let commentaires;
        commentaires = await Reviews
            .find({ produitId: productId })
            .sort({ nom: 1 });

        res.json(commentaires);
    });
});

module.exports = router;
