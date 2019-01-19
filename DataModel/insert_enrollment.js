// import external class
let mongoose = require('mongoose');
let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');

const courseDB = require('./dbConn');

userModel
	.find({currentTerm: 2})
	.exec()
	.then( function(docs) {
		docs.map(doc => {
		let enroll = new enrollmentModel({
			user: doc._id,
			course_list: [
				{_id: '1COMP9021'}, 
				{_id: '1COMP9020'}, 
				{_id: '1COMP9311'}]
		})
		.save()
		.then(
			console.log(doc._id + 'inserted successfully!')
		)
		.catch(err => console.log(err))
	})}
);