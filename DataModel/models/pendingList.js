let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let pendingListSchema = new Schema({
    user: {
        type: Number, ref: 'User',
        unique: true,
    },
    course_list: [{
        _id: {type: String, ref: 'Course'},
        star: {type: Number, default: 0} ,
    }],
})

module.exports = mongoose.model('PendingList', pendingListSchema, 'PendingList');