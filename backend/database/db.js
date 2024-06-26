const mongoose = require("mongoose");

const uri = "mongodb+srv://MongoDb:1@cluster0.8svmk58.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connexion à MongoDb réussie"))
    .catch((err) => console.log("Erreur de connexion ! Erreur : " + err.message));
}

module.exports = connection;
