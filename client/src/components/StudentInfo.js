import React, {Component } from 'react';


class StudentInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            current_sem : "",
        }
    }

    componentWillMount(props){
      let username = localStorage.getItem('session-username').slice(1,-1)
        fetch('/api/user/' + username)
        .then(res => res.json())
        .then(json => this.setState({
            name : `${json.username.first_name + ' ' + json.username.last_name}`,
            email: `${json.username.email}`,
            current_sem: `2018 S${json.username.currentTerm}`
        }))
        .catch((err) => {
            console.log(`Opz, something wrong, the error message is ${err}`);
        });
    }

    render() {
      return (
          <div>
            {/* Below are the detials for the student */}
              <div className="col-md-6">
                  <div className="section-header">
                    <h2>Student Information</h2>
                  </div>
                  <img src={require(`../images/5198410.jpg`)} alt="" className="Student_img"/>
                  <div className="student_info"> 
                    <div className="feature">
                      <i className="feature-icon fa fa-flask"></i>
                      <div className="feature-content">
                        <h3>Student Name</h3>
                        <h4>{this.state.name}</h4>
                      </div>
                    </div>
                    <div className="feature">
                      <i className="feature-icon fa fa-users"></i>
                      <div className="feature-content">
                        <h3>Email</h3>
                        <h4>{this.state.email}</h4>
                      </div>
                    </div>
                    <div className="feature">
                      <i className="feature-icon fa fa-comments"></i>
                      <div className="feature-content">
                        <h3>Current Term</h3>
                        <h4>{this.state.current_sem}</h4>
                      </div>
                  </div>
                </div>
            </div>
        </div> 
      );
    }
  }

  export default StudentInfo;