//Done

import React, { Component } from 'react';
import '../css/style.css';
import LoginForm from '../components/LoginForm';
import { Helmet } from "react-helmet";

const Loginbackground = (props) => 
  <div>
    {/* Below is the example how you write the html header */}
    <Helmet>
        <title>Course Enrollment System</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" type="css/text" href="./css/login.css" />
    </Helmet>
    {/* Body html begin */}
    {/* Login part */}
      <div className="container-login100">
          <div className="wrap-login100">
                <span className="login100-form-title">
                    Course Management System Login
                </span>
                {/* Link into component LoginForm */}
                <LoginForm/>
          </div>
      </div>
  </div>
	

class LoginPage extends Component {
    
    render() {
        return (
            <div>         
              <Loginbackground />
            </div>
        );
      }
    }
export default LoginPage;