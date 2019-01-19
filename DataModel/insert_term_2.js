let mongoose = require('mongoose');
let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
let enrollmentModel = require('./models/enrollment.js');

const courseDB = require('./dbConn');

let course_list = ['2COMP9331', '2COMP9024', '2BINF6111', '2BINF9010', '2COMP9041', '2COMP9517', 
    '2COMP9417', '2COMP9415', '2COMP9319', '2COMP9315', '2COMP9313', '2COMP9154', '2COMP9101', 
    '2COMP6841', '2COMP6441', '2COMP4141']

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

userModel
	.find({currentTerm: 3})
	.exec()
	.then( function(docs) {
			docs.map(doc => {
				let index = []
				while(index.length<3){
					let a = getRandomInt(course_list.length)
					if(!index.includes(a)){
						index.push(a)
					}
				}

				let enroll = new enrollmentModel({
						user: doc._id,
						course_list: [
								{_id: '1COMP9021', star: getRandomInt(5)+1}, 
								{_id: '1COMP9020', star: getRandomInt(5)+1}, 
								{_id: '1COMP9311',star: getRandomInt(5)+1},
								{_id: course_list[index[0]],star: getRandomInt(5)+1},
								{_id: course_list[index[1]],star: getRandomInt(5)+1},
								{_id: course_list[index[2]],star: getRandomInt(5)+1},
							]
				})
				.save()
				.then(
					console.log(doc._id + 'inserted successfully!')
				)
				.catch(err => console.log(err))
			})
		}
	);