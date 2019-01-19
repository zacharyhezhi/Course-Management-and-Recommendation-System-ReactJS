// import external class
let mongoose = require('mongoose');
let courseModel = require('./models/course.js');
let userModel = require('./models/user.js');
const course_data = require('./data/opt_course_data.json');
const user_data = require('./data/user_data_up.json')

// define the address and database name, then connect
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'coursetest';      // REPLACE WITH YOUR DB NAME
const url = `mongodb://${server}/${database}`;
class Database{
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(url)
      .then(() => {
        console.log('Database connection successful')
        //mongoose.connection.db.dropDatabase();
        //console.log('Database drop');
        // userModel.remove({})
        //   .then(() => {
        //     console.log('collection removed')
        //   })
        //   .catch(err => {
        //     console.log('error: '+err)
        //   })
      
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

module.exports = new Database();