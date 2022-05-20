const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')
require('./Item')
require('./Receipt')
require('./Behavior')
app.use(bodyParser.json())

const Employee = mongoose.model("employee")
const Item = mongoose.model("item")
const Receipt = mongoose.model("receipt")
const Behavior = mongoose.model("behavior")

//Connect to the cluster
// user= sharefridge   password= sharefridge
const mongoUrl = "mongodb+srv://sharefridge:sharefridge@clusterbp.lyweo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Connect to db

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("Connected", () => {
    console.log("Connected to the db")
})

mongoose.connection.on("error", (error) => {
    console.log("error", error)
})




//  Users API

app.get('/users', (req, res) => {
    Employee.find({}).then(data => {
        res.send(data)
        console.log("modtaget YYYYYYYYYYYYYYYYYYEs")
    }).catch(error => {
        console.log(error)
    })
})

app.post('/send-user', (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        picture: req.body.picture,
        balance: req.body.balance
    })
    employee.save()
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })

})

app.post('/delete-user', (req, res) => {
    Employee.findOneAndDelete({email:req.body.email})
    .then(data => {
        console.log(data)
        res.send(data)
    })
})

app.post('/update-user-balance', (req, res) => {
    Employee.findOneAndUpdate({email:req.body.email}, {
        balance: req.body.balance
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(error => {
        console.log(error)
    })
})

app.post('/update-user-password', (req, res) => {
    Employee.findOneAndUpdate({email:req.body.email}, {
        password: req.body.password,
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(error => {
        console.log(error)
    })
})

app.post('/get-selected-user', (req, res) => {
    Employee.findOne({email: req.body.email})
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})












//  Items API


app.post('/send-item', (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        type: req.body.type,
        description: req.body.description,
        picture: req.body.picture,
        suger: req.body.suger,
        caffeine: req.body.caffeine,
        fat: req.body.fat,
        salt: req.body.salt,
        priority: req.body.priority
    })
    item.save()
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})

app.get('/items', (req, res) => {
    Item.find({}).then(data => {
        res.send(data)
        console.log("modtaget YYYYYYYYYYYYYYYYYYEs")
    }).catch(error => {
        console.log(error)
    })
})


app.post('/get-selected-item', (req, res) => {
    Item.findOne({ name: req.body.name })
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})

app.post('/update-selected-item', (req, res) => {
    Item.findOneAndUpdate({ name: req.body.name }, {
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        type: req.body.type,
        description: req.body.description,
        picture: req.body.picture,
        suger: req.body.suger,
        caffeine: req.body.caffeine,
        fat: req.body.fat,
        salt: req.body.salt,
        priority: req.body.priority
    })
        .then(data => {
            res.send(data)
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
})

app.post('/delete-item', (req, res) => {
    Item.findOneAndDelete({name:req.body.name})
    .then(data => {
        console.log(data)
        res.send(data)
    })
})











// receipt API's

app.post('/add-receipts', (req, res) => {
    const receipt = new Receipt({
        email: req.body.email,
        date: req.body.date,
        cartItems: req.body.cartItems

    })
    receipt.save()
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})


app.post('/get-personal-receipts', (req, res) => {
    Receipt.find({email: req.body.email})
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})


app.get('/get-all-receipts', (req, res) => {
    Receipt.find({})
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})

app.get('/delete-receipts', (req, res) => {
    Receipt.findOneAndDelete({cartItems: []})
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})











// Behavior API's


app.post('/add-behavior', (req, res) => {
    const behavior = new Behavior({
        email: req.body.email,
        suger: 0,
        salt: 0,
        caffeine: 0,
        fat: 0
    })
    behavior.save()
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})


app.post('/get-behavior', (req, res) => {
    Behavior.findOne({ email: req.body.email })
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})

app.get('/get-all-behavior', (req, res) => {
    Behavior.find({})
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(error => {
            console.log(error)
        })
})


app.post('/update-behavior', (req, res) => {
    Behavior.findOneAndUpdate({ email: req.body.email }, {
        email: req.body.email,
        suger: req.body.suger,
        salt: req.body.salt,
        caffeine: req.body.caffeine,
        fat: req.body.fat
    })
        .then(data => {
            res.send(data)
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
})

app.post('/delete-behavior', (req, res) => {
    Behavior.findOneAndDelete({email: req.body.email})
    .then(data => {
        console.log(data)
        res.send(data)
    })
})







app.listen(process.env.PORT, () => {
    console.log("server is running!")
})

