module.exports = function (req, res, next){

    const bearerheader = req.headers['authorization']

    if(typeof bearerheader !== 'undefined'){
        const bearer = bearerheader.split(' ')

        const bearerToken = bearer[1]

        req.token = bearerToken

        next()
        
    } else res.sendStatus(403)
}

// module.exports = {verifyToken}