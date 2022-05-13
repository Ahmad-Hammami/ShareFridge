const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({

    email: String,
    cartItems: Array

})

mongoose.model("receipt", ReceiptSchema)