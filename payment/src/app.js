const express = require('express')
const Payment = require("./models/payment_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

/*
    TODO: Add validators using express-validator 
    to sanitize and validate query and body param
    for all API endpoints
*/

app.get("/", (req, res) => {
    res.json({ msg: "PAYMENT" });
});

app.get("/api/v1/payments", async (req, res) => {
    /* 
        GET /api/v1/payments/{paymentID}
        Endpoint to retrive payment
        Only allows to retrieve single payment for now as every order should link to single payment
        Could further expand in future to allow internal reporting to query all unresolved payments
        Returns all orders unless query params specified

        Query params
            hotelName - String (optional)
            customerName - String (optional)
            customerPhone - Numeric (optional)
            customerEmail - String (optional)
        
        Response
            status - Response status
            orders - list of order objects
    */
    const paymentID = req.query.paymentID
    if (paymentID !== undefined || paymentID != "") {
        const payment = await Payment.findById(req.query.paymentID).exec();
        res.json({"status": "SUCCESS", "payment": payment});
    }
    res.statusMessage = "PaymentID required";
    res.status(401).end();
});

app.post("/api/v1/payments", async (req, res) => {
    /* 
        POST /api/v1/payments/{paymentID}
        Endpoint to retrive payment
        Only allows to retrieve single payment for now as every order should link to single payment
        Could further expand in future to allow internal reporting to query all unresolved payments
        Returns all orders unless query params specified

        Query params
            hotelName - String (optional)
            customerName - String (optional)
            customerPhone - Numeric (optional)
            customerEmail - String (optional)
        
        Response
            status - Response status
            orders - list of order objects
    */
    if (req.body.totalAmount !== undefined) {
        try {
            const payment = new Payment({
                totalAmount: req.body.totalAmount,
            })
            const savedPayment = await payment.save();
            res.json({"status": "SUCCESS", payment: savedPayment});
        } catch (error) {
            res.sendStatus(404);
        }
    } else {
        const creditCardNum = req.body.creditCardNum;
        const creditCardName = req.body.creditCardName;
        const creditCardExpDate = req.body.creditCardExpDate;
        const creditCardCCV = req.body.creditCardCCV;
        try {
            if ((creditCardNum == undefined || creditCardNum == '') ||
            (creditCardName == undefined || creditCardName == '') ||
            (creditCardExpDate == undefined || creditCardExpDate == '') ||
            (creditCardCCV == undefined || creditCardCCV == '')
            ) {
                res.statusMessage = "Missing or invalid data provided";
                res.status(401).end();
            }
            // Mocking credit card authenication before using it for payment
            async function authenticateCreditCard() {
                console.log("Authorize credit card");
                // should have third party API or something to authorize the card for payment
                return true
            }
            authenticateCreditCard().then(() => {
                async function updatePaymentStatus() {
                    await Payment.updateOne({_id: req.query.paymentID}, {
                        status: "complete"
                    });
                    res.json({"status": "SUCCESS", payment: savedPayment});
                }
                updatePaymentStatus();
            })
        } catch (error) {
            res.sendStatus(404);
        }
    }
});


module.exports = app;