let mongoose = require('mongoose');
let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');

const url = "mongodb://localhost:27017/coursetest";
const course_data = require('./data/opt_course_data2.json');
const user_data = require('./data/user_data_up.json');
const enrollment_data = require('./data/enrollment.json');

mongoose.connect(url)
	.then(
		() => {
			console.log('Database connects successfully')
		},
		err => { console.log(err) }
	)
enrollmentModel
	.find({'course_list._id': '2COMP9024'})
	.exec(function(err, docs){
		let star_list = []
		docs.filter(doc => {
			doc.course_list.filter(course => {
				if(course._id === '2COMP9024'){
					star_list.push(course.star)
				}
			})
		})
		console.log(star_list)
	})