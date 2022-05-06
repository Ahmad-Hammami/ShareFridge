const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('./Employee')
const Employee = mongoose.model("employee")

//Connect to the cluster
// user= sharefridge   password= sharefridge

const mongoUrl = "mongodb+srv://sharefridge:sharefridge@clusterbp.lyweo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Connect to db

mongoose.connect(mongoUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("Connected",()=>{
    console.log("Connected to the db")
})

mongoose.connection.on("error",(error)=>{
    console.log("error", error)
})

app.get('/', (req, res)=>{
    res.send("welcome to node js")
})



app.listen(3000, () =>{
    console.log("server is running!")
})
