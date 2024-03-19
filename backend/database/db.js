const mongoose = require("mongoose");

const uri = "mongodb+srv://MongoDb:1@cluster0.8svmk58.mongodb.net/?retryWrites=true&w=majority";

const connection = () =>{
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("MongoDb bağlantısı başarılı"))
    .catch((err) => console.log("Bağlatı Hatası! Hata: " + err.message));
}

module.exports = connection;