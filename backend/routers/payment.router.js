const Iyzipay = require('iyzipay');
const {v4:uuidv4} = require("uuid");
const express = require("express");
const router = express.Router();
const response = require("../services/response.service");

router.post("/payment", async(req, res) => {
    response(res, async()=>{
        const id = uuidv4();
    
        const {price, cartName, cartNumber, expireMonth, expireYear, cvc, registerCard} = req.body;
    
        const iyzipay = new Iyzipay({
            apiKey: 'sandbox-G06dFjcMkXItng9Ke4NlnCOijkGg5cHp',
            secretKey: 'sandbox-Hjb2KKz4D3HnAkRSH4v9p57FNkSRoi9v',
            uri: 'https://sandbox-api.iyzipay.com'
        });
        
        const request = {
            locale: "tr",
            conversationId: id,
            price: price,
            paidPrice: price,
            currency: "TRY",
            installment: '1',
            paymentChannel: "WEB",
            paymentGroup: "PRODUCT",
            paymentCard: {
                cardHolderName: cartName,
                cardNumber: cartNumber,
                expireMonth: expireMonth,
                expireYear: expireYear,
                cvc: cvc,
                registerCard: registerCard
            },
            buyer: {
                id: 'BY789',
                name: 'John',
                surname: 'Doe',
                gsmNumber: '+905350000000',
                email: 'email@email.com',
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                ip: '85.34.78.112',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: 'Jane Doe',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            billingAddress: {
                contactName: 'Jane Doe',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            basketItems: [
                {
                    id: 'BI101',
                    name: 'Binocular',
                    category1: 'Collectibles',
                    category2: 'Accessories',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                    price: price
                },
            ]
        };
        
        iyzipay.payment.create(request, function (err, result) {
            if (result.errorMessage) {
                let message = result.errorMessage;
                res.status(403).json({message: message});
            } else {
                return res.json({ message: "Ödeme başarılı" });
            }
        });
    })
})

module.exports = router;