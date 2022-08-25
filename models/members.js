const express = require("express");
const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
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
    expiryDate: {
        type: Date,
        required: true
    }
},
{ timestamps: true });


const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;