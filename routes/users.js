const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const verifyToken = require('../verifier')

router.get('/', verifyToken, (req, res) => {

    jwt.verify(req.token, 'anykey', async (err, authData) => {
        if(!err){
            const users = await User.find()
            // res.send(users)
            res.json({
                users,
                authData
            })
        } else {
            res.sendStatus(403)
            
        }
    })
    
})

router.get('/all', async (req, res) => {
    
    try{
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.send(err)
    }
})

router.post('/add', async (req, res) => {
    

    try{
        const hashedPassword = await bcrypt.hash( req.body.password, 10)
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        })

        const newUser = await user.save()
        res.send(newUser)
    } catch(err) {
        return res.sendStatus(500)
    }
})

// function verifyToken(req, res, next){
    
//     const bearerheader = req.headers['authorization']

//     if(typeof bearerheader !== 'undefined'){
//         const bearer = bearerheader.split(' ')

//         const bearerToken = bearer[1]

//         req.token = bearerToken

//         next()
        
//     } else {res.sendStatus(403)}
// }


module.exports = router