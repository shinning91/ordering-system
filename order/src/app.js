const express = require('express')
const axios = require('axios').default;
const Order = require("./models/order_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

/*
    TODO: Add validators using express-validator 
    to sanitize and validate query and body param
    for all API endpoints
*/

app.get("/", (req, res) => {
    res.json({ msg: "ORDER" });
});

app.get("/api/v1/orders", async (req, res) => {
    /* 
        GET /api/v1/orders
        Endpoint to retrive orders
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
    async function getOrder() {
        try {
            let query = {};
            if (req.query.hotelName != undefined) {
                query.hotelName = req.query.hotelName;
            } else if (req.query.customerName != undefined) {
                query.customerName = req.query.customerName;
            } else if (req.query.customerPhone != undefined) {
                query.customerPhone = req.query.customerPhone;
            } else if (req.query.customerEmail != undefined) {
                query.customerEmail = req.query.customerEmail;
            }
            const orders = await Order.find(query).exec();
            res.json({"status": "SUCCESS", "orders": orders})
        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    }
    getOrder();
}); 

app.post("/api/v1/orders", async (req, res) => {    
    /* 
        POST /api/v1/orders
        Endpoint to create order
        Returns created order if success

        Body params
            hotelID - String,
            hotelName: String,
            checkInDate: Date,
            checkOutDate: Date,
            customerName: String,
            customerEmail: String,
            customerPhone: Numeric,
            roomID: String,
            roomName: String,
            numberOfGuests: Numeric,
            totalAmount: Decimal
        
        Response
            status - Response status
            order - single order object
    */
    async function requestPaymentOrderCreate(){
        try {
            
            const URL = "http://payment:3000/api/v1/payments"
            let params = {
                totalAmount: req.body.totalAmount
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(URL, params, config);
            let paymentData = response.data['payment'];
            const paymentID = paymentData['_id'].toString();
            const order = new Order({
                hotelID: req.body.hotelID,
                hotelName: req.body.hotelName,
                checkInDate: req.body.hotelCheckInDate,
                checkOutDate: req.body.hotelCheckOutDate,
                customerName: req.body.customerName,
                customerEmail: req.body.customerEmail,
                customerPhone: req.body.customerPhone,
                roomID: req.body.roomID,
                roomName: req.body.roomName,
                numberOfGuests: req.body.numberOfGuests,
                totalAmount: req.body.totalAmount,
                paymentID: paymentID
            });
            order.save()
            res.json({ "status": "SUCCESS", "obj": order });
        } catch (error) {
          console.error(error);
          res.sendStatus(404);
        }
    }
    requestPaymentOrderCreate();
});


module.exports = app;