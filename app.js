
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/user')


const url = 'mongodb://localhost/mydb'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})

const con = mongoose.connection

con.on('open', function(){
    console.log('Connected to database')
})

app.set('views', path.join(__dirname, '/public/views'))
app.set('view engine', 'ejs')
app.use(express.json())

app.get('/sample', (req, res) => {
    res.render("demo", {title: "EJS View engine"})
})

app.get('/', (req, res) => {
    res.status(200).send('Welcome to home page')
})

app.post('/login', async (req, res) => {
    // console.log(req)
    console.log(req.body.username)
    // console.log(req.params.username)

    const loggedUser = await User.findOne({"username" : req.body.username})
    
    console.log(loggedUser)

    if(await bcrypt.compare(req.body.password, loggedUser.password)){
        jwt.sign({loggedUser}, 'anykey', (err, token) => {
            res.json({
                token
            })
        })
    } else res.sendStatus(500)

    

})

app.get('/loginpage', async (req, res) => {
    res.render("login")
})

const twitRouter = require('./routes/twits')
app.use('/twits', twitRouter)

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(5005, () => {
    console.log('Server listening on port 5005')
})

