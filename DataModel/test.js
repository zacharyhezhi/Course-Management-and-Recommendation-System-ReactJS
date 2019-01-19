const express = require('express');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/";

let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');
let pendingListModel = require('./models/pendingList');


// const enrollmentInfo = new Promise((resolve, reject) => {
//   mongoose.connect(url+'coursetest')
//   .then(
//     () => {
//       console.log('Database connect')
//     },
//     err => { console.log(err) }
//   )

  // courseModel
  // .find({'full_name': /.*di.*/i})
  //   .exec(function(err, docs){
  //     if (err) return handleError(err);
  //     console.log('docs', docs);
      
  //   })
  // }) // promise end

const enrollmentInfo = new Promise((resolve, reject) => {
  mongoose.connect(url+'coursetest')
  .then(
    () => {
      console.log('Database connect')
    },
    err => { console.log(err) }
  )

  let course_list = ['3COMP9024', '3COMP9444']

  function getAllCourse(course_list){
    return Promise.all(course_list.map( course => {
      return new Promise((resolve, reject) => {
        courseModel
          .find({'_id': course})
          .exec(function(err,docs){
            if(err) return handleError(err);
            //console.log(docs[0])
            resolve(docs[0])
        })
      })
    }))
  }

  getAllCourse(course_list)
    .then(res => console.log(res))

  
  // Promise.all(newL)
  //   .then(completed => console.log(completed))

  // enrollmentModel
  // .findOneAndUpdate(
  //   {'user': parseInt(5198786), 'course_list._id': '1COMP9021'},
  //   {'$set':{ 'course_list.$.star': 4 } },
  //   {'new': true, "upsert": true})
  //   .exec(function(err, raw){
  //     if (err){
  //       console.log(err)
  //     }
  //     console.log(raw)
      
  //   })

  // enrollmentModel
  //   .findOneAndUpdate({'user': parseInt(5198786)},
  //   {'$push': {'course_list': {'_id':'2COMP9417'} }},
  //   { "new": true, "upsert": true })
  //   .exec(function(err, docs){
  //     if (err) {
  //     console.log(err)
  //   };
  //     console.log(docs)
  //     //console.log('docs', docs[0].course_list);
      
  //   })
  }) // promise end
// enrollmentInfo
//   .then(full_list => {
//     pendingListModel
//       .find({'user': full_list['id']})
//       .exec(function(err, docs){
//         if (err) return handleError(err);
//         full_list['pending'] = docs[0].course_list
//         //resolve(full_list);
//         //mongoose.disconnect();
//       })
//     }
//   ).then(full_list => {
//     console.log(full_list)
//   })
  

