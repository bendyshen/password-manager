const Schema = require('mongoose').Schema

module.exports = new Schema({
    requester:{
        type:String,
        required: true
    },
    target:{
        type: String,
        required: true
    },
    accepted: {
        type: Boolean, default: false
    }
}, {collection:'shareSchema'})