import React, { Component } from 'react';
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';

import NavigationBar from '../components/NavigationBar';
import CourseReview from '../components/CourseReview';

// basic page structure  
const CourseReviewBackground = () => 
    <div className = "Sbody">
          <div id = "contact" className = "section">
          {/* Navigationbar part */}
            <NavigationBar/>
            <div className = "container">
                <div className = "row">
                    <div className="section-header">
                        <h1>Course Review</h1>
                    </div>
                    {/* Course review part */}
                    <CourseReview />
                </div>
            </div>
        </div>
    </div>

class CourseReviewPage extends Component {
  render() {
    return (
      <div>    
        <CourseReviewBackground/>
      </div>
    );
  }
}

export default CourseReviewPage;






