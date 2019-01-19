const express = require('express');
const mongoose = require('mongoose');

let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');
let pendingListModel = require('./models/pendingList.js');

const courseDB = require('./dbConn');


let enroll = new pendingListModel({
    user: 5198786,
    course_list: [
        {_id: '2COMP9024'}, 
        {_id: '2COMP9417'}, 
        {_id: '2COMP9101'}]
})
.save()
.then(
    console.log(5198786 + ' pendinglist inserted successfully!')
)
.catch(err => console.log(err))