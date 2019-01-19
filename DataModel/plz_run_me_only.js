// import external class
let mongoose = require('mongoose');
let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');
let codeModel = require('./models/code');

const url = "mongodb://localhost:27017/coursetest";
const course_data = require('./data/opt_course_data2.json');
const user_data = require('./data/user_data_up.json');
const enrollment_data = require('./data/enrollment.json');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getSum(array) {
  return array.reduce(function (r, a) {
      return r + a;
  }, 0);
}

const dropDB = new Promise((resolve, reject) => {
  mongoose.connect(url)
  .then(() => {
    mongoose.connection.db.dropDatabase(function(err){
      if(err){
        reject(err)
      }else{
        resolve()
      }
    });
  })
  .catch(err => {
    console.error('Database connection error')
  })
})
  dropDB
  .then(res => {
      const insertJson = new Promise((resolve, reject) => {
        let json_list = []
        // insert json into mongoDB
        courseModel.insertMany(course_data, function(err,result) {
          if (err) {
            // handle error
            console.log(err);
          } else {
            // handle success
            json_list.push(0)
            if(json_list.length === 3){
              resolve()
            }
            console.log("All courses are inserted successfully")
          }
        });

        userModel.insertMany(user_data, function(err,result) {
          if (err) {
            // handle error
            console.log(err);
          } else {
            // handle success
            json_list.push(0)
            if(json_list.length === 3){
              resolve()
            }
            console.log("All users are inserted successfully")
          }
        });

        enrollmentModel.insertMany(enrollment_data, function(err, result){
          if (err) {
            // handle error
            console.log(err);
          } else {
            // handle success
            json_list.push(0)
            if(json_list.length === 3){
              resolve()
            }
            console.log("All enrollment are inserted successfully")
          }
        })
      })
      insertJson
      .then(() => {
        const star_initial = new Promise((resolve, reject) => {
          courseModel
          .find({}, 'code')
          .exec(function(err, docs){
            let course_list = []
            docs.forEach(doc => {
              if(!course_list.includes(doc.code)){
                course_list.push(doc.code)
              }
            });
            //console.log(course_list)
            let check_list = []
            course_list.map( course => {
              let newCode = new codeModel({
                _id: course
              })
              .save()
              .then(() => {
                check_list.push(0)
                if(check_list.length === course_list.length){
                  resolve()
                }
              })
              .catch(err => console.log(err))
            })
          })
        })
        star_initial
        .then(() => {
          const star = new Promise((resolve, reject) => {
            let check_list = []
            let all_course = ['1COMP9021', '1COMP9311', '1COMP9020', '2COMP9331', '2COMP9024', '2BINF6111', '2BINF9010', '2COMP9041', '2COMP9517', 
            '2COMP9417', '2COMP9415', '2COMP9319', '2COMP9315', '2COMP9313', '2COMP9154', '2COMP9101', 
            '2COMP6841', '2COMP6441', '2COMP4141']
            all_course.map( code => {
              enrollmentModel
              .find({'course_list._id': code})
              .exec(function(err, docs){
                let star_list = []
                let sum = 0
                docs.filter(doc => {
                  doc.course_list.filter(course => {
                    if(course._id === code){
                      star_list.push(course.star)
                    }
                  })
                })
                //console.log(code,star_list)
                sum = getSum(star_list)
                let mean = 0;
                mean = (sum/star_list.length).toFixed(1);
                codeModel
                .findOneAndUpdate({'_id': code.slice(1,)},
                {'$set': {'avg_star': mean}},
                {'new': true})
                .exec(function(err, docs){
                  if (err) {console.log(err)}
                  //console.log(docs)
                  check_list.push(0)
                  if(check_list.length === all_course.length){
                    resolve()
                  }
                })
              })
            })
          })
          star
          .then(() => {
            console.log('------------------------------------------')
            console.log('All database has been setuped sucessfully! Enjoy!')
            console.log('------------------------------------------')
            mongoose.disconnect()
          })
        })
        
      }) 
  })

