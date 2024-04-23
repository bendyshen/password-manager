const Schema = require('mongoose').Schema

module.exports = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {collection : 'userSchema'})