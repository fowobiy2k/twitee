const mongoose = require('mongoose')

const twitSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Twit', twitSchema)