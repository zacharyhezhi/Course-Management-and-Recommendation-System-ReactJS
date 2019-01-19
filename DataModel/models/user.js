let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    first_name: String,
    last_name: String,
    _id: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: String,
    role: String,
    currentTerm: Number,
    email: String,
    gender: String,
})
userSchema.virtual('full_name').get(function() {
    return this.firstName + ' ' + this.lastName
})
module.exports = mongoose.model('User', userSchema, 'User');