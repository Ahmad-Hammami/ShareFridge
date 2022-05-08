const { type } = require('express/lib/response')
const mongoose = require('mongoose')


//create schema
const ItemSchema = new mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    type:String,
    description:String, 
    picture:String,
    suger:Boolean,
    caffeine: Boolean,
    fat:Boolean,
    salt:Boolean,
    priority:Boolean
})


mongoose.model("item", ItemSchema)
