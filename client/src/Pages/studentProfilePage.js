import React, { Component } from 'react';
import { Helmet } from 'react-helmet'; 
// import Iframe from 'react-iframe'

import '../css/style.css';
import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';

import NavigationBar from '../components/NavigationBar';
import StudentInfo from '../components/StudentInfo';
import EnrollmentInfo from '../components/EnrollmentInfo';

// TODO: need decomposite the student info and course enrolment info from the below html code. 
const StudentProfileBackground = () => 
        <div>
          <Helmet>
          <meta charset="utf-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          {/* <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> */}

          <title>Student Profile</title>

          {/* <!-- Custom stlylesheet -->
          <!-- Original css--> */}
          <link type="css" rel="stylesheet" href="css/style.css"/>

          {/* <!-- Bootstrap--> */}
          <link type="css" rel="stylesheet" href="css/bootstrap.min.css"/>

          {/* <!-- Icons --> */}
          <link rel="stylesheet" type="font" href="css/font-awesome.min.css"/>
          </Helmet>
          {/* Write your background code here. */}

          <div className="Sbody">
            <div id="about" className="section">
            {/* Navigationbar part */}
              <NavigationBar/>     
              <div className="container">
                <div className="row">
                {/* Student Information part */}
                  <StudentInfo/>
                  <div className="section-header">
                    <h2>Your Enrollents</h2>
                  </div>
                      {/* <!-- Enrollment Component --> */}
                      <EnrollmentInfo/>
                </div>
              </div>
            </div>
          </div>

        </div>



class StudentProfilePage extends Component {

  render() {
    return (
      <div>
        <StudentProfileBackground/>
      </div> 
    );
  }
}

export default StudentProfilePage;
