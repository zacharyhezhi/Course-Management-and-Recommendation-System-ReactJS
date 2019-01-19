let mongoose = require('mongoose');
const url = "mongodb://localhost:27017/";

let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');
let async = require('async');

let m = require('./user_course_insert.js');

const tasks = [
	function insertData() {
		mongoose.connect(url+'coursetest')
		.then(
			() => {
				console.log('Database connect')
			},
			err => { console.log(err) }
		)
			
		m.insert_json();
	},
	function disconnect(callback){mongoose.disconnect()}
]

async.series(tasks, (err, results) => {
	if (err) {
			console.log('dddddd');
	}
	console.log(results);
})
