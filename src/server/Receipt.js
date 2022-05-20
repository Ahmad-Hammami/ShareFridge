const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({

    email: String,
    date: Date,
    cartItems: Array

})

mongoose.model("receipt", ReceiptSchema)