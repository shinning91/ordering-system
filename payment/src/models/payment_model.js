const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    totalAmount: Number,
    status: { type: String, "enum": ["pending", "complete"], default: 'pending' },
    createdDate: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Payment", PaymentSchema);