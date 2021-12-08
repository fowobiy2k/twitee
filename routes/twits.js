const express = require('express')
const router = express.Router()
const Twit = require('../models/twit')
const User = require('../models/user')

router.get('/', verifyUser, verifyManager, async (req, res) => {
    // const user = req.user
    // res.send(user)
    try{
            const twits = await Twit.find()
            res.json(twits)
            
    }
    catch(err) {
        res.status('404').send(err)
    }
})

router.get('/all', async (req, res) => {
    const twits = await Twit.find()
    res.send(twits)
    // try{
    //         const twits = await Twit.find()
    //         res.json(twits)
            
    // }
    // catch(err) {
    //     res.status('404').send(err)
    // }
})


router.get('/:id', async (req, res) => {
    try{
            const twit = await Twit.findById( req.params.id)
            res.json(twit)
    }
    catch(err) {
        res.status('404').send(err)
    }
})

router.post('/', async (req, res) => {

    const twit = new Twit({
        creator: req.body.creator,
        content: req.body.content,
    })
    try{
            const t = await twit.save()
            res.json(t)
    }
    catch(err) {
        res.send(err)
    }
})

async function verifyUser(req, res, next) {

    const name = req.body.username
    const user = await User.findOne({"username" : name})

    console.log(user)

    if(!user){

        return res.status(403).send("Not allowed")
    }

    req.user =  user

    next()
}

function verifyManager(req, res, next) {

    const role = req.user.role
    console.log('Role:')
    console.log(role)
    // const user = await Twit.find({creator: name})
    if(role !== 'manager'){

        return res.status(403).send("Not allowed")
    }

    next()
}

module.exports = router