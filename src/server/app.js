const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')
require('./Item')

app.use(bodyParser.json())
const Employee = mongoose.model("employee")
const Item = mongoose.model("item")


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




//  Users API

app.get('/users', (req, res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
})

app.post('/send-user', (req, res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        type:req.body.type,
        picture:req.body.picture,
        balance:req.body.balance
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
    
})

app.post('/deleteuser',(req, res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    })
})

app.post('/updateuser',(req, res)=>{
    Employee.findByIdAndUpdate(req.body.id, {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        type:req.body.type,
        picture:req.body.picture,
        balance:req.body.balance
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
})




//  Items API


app.post('/send-item', (req, res)=>{
    const item = new Item({
        name:req.body.name,
        price:req.body.price,
        amount:req.body.amount,
        type:req.body.type,
        description:req.body.description, 
        picture:req.body.picture,
        suger:req.body.suger,
        caffeine:req.body.caffeine,
        fat:req.body.fat,
        salt:req.body.salt,
        priority:req.body.priority
    })
    item.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
})








app.listen(3000, () =>{
    console.log("server is running!")
})

