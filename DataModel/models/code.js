let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let courseSchema = new Schema({
    _id: String,
    avg_star: {
        type: Number, default: 0
    }
})

module.exports = mongoose.model('Code', courseSchema, 'Code');