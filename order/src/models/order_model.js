const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    hotelID: String,
    hotelName: String,
    checkInDate: Date,
    checkOutDate: Date,
    customerName: String,
    customerEmail: String,
    customerPhone: Number,
    roomID: String,
    roomName: String,
    numberOfGuests: Number,
    totalAmount: Number,
    paymentID: [
        { type: Schema.Types.ObjectId, ref: 'Payment'}
    ]
});

module.exports = mongoose.model("Order", OrderSchema);