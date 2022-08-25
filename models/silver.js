const express = require("express");
const mongoose = require("mongoose");

const SilverSchema = mongoose.Schema({
    createdAt: { type: Date, expires: '43800m', default: Date.now },
    id: {
        type: String,
        required: true,
    },
    type : {
        type: String,
        required: true,
    },
    amountpaid: {
        type: Number,
        required: true,
    },
    activeDate : {
        type: Date,
        required: true,
        default: Date.now,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true
    }, 
    razorpay_signature: {
        type: String,
        required: true
    },
},
{ timestamps: true });


const Silver = mongoose.model("Silver", SilverSchema);
module.exports = Silver;