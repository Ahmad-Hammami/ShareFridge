const { type } = require('express/lib/response')
const mongoose = require('mongoose')


const BehaviorSchema = new mongoose.Schema({
    email: String,
    suger: Number,
    salt: Number,
    caffeine: Number,
    fat: Number
})

mongoose.model("behavior", BehaviorSchema)