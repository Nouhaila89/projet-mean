const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/db");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");
const basketRouter = require("./routers/basket.router");
const paymentRouter = require("./routers/payment.router");

app.use("/api/auth", authRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/baskets", basketRouter);
app.use("/api/payme", paymentRouter);

connection();

const port = process.env.PORT || 5000;
app.listen(port,() => console.log("Uygulama başarılı şekilde ayğa kalktı"));