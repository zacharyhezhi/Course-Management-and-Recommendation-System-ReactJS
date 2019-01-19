import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';

//import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';

class CourseEnrolmentPage extends Component {
  
  render() {
    return (
      <div>
          <div className="Sbody">
          <div id="contact" className="section">
          {/* Navigationbar part */}
            <NavigationBar/>
            <div className="container">
              <div className="row">
                <div className="section-header">
                  <h1>Course Enrollment</h1>
                </div>
                {/* <!-- Search&Result --> */}
                <SearchResult/>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default CourseEnrolmentPage;