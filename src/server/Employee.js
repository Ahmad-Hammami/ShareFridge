const { type } = require('express/lib/response')
const mongoose = require('mongoose')


//create schema
const EmployeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    type:String,
    balance:Number,  //cannot works for int
    picture:String
})


mongoose.model("employee", EmployeeSchema)