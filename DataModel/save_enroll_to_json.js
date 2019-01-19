let mongoose = require('mongoose');
const url = "mongodb://localhost:27017/";
let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');

let fs = require('fs')

const enrollmentInfo = new Promise((resolve, reject) => {
    mongoose.connect(url+'coursetest')
    .then(
      () => {
        console.log('Database connect')
      },
      err => { console.log(err) }
    )
  
    enrollmentModel
      .find({})
      .exec( function(err, docs){
        console.log(docs);
        fs.writeFile("./enrollment.json", JSON.stringify(docs), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
      })
    })

