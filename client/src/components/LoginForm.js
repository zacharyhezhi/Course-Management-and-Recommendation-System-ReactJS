import React, { Component } from 'react';
// import { Redirect, Link , withRouter} from 'react-router-dom';


class LoginForm extends Component {

    constructor(props){
      super(props);
      this.state = {
        username : "",
        password : "",
        isAuthenticated: false
      };
      this.Authentication = this.Authentication.bind(this);
    };

    componentWillMount(){
      if(localStorage.getItem('session-username')){
        window.location.href = "/studentprofile"
      }
    }

    handleUsernameChanged(event){
      this.setState({username : event.target.value});
    }

    handlePasswordChanged(event){
      this.setState({username : event.target.value});
    }


    Authentication(e) {
      e.preventDefault()
      let auth_bool = false;
      let username = this.refs.username.value;
      this.setState({username : this.refs.username.value, password: this.refs.password.value})

      if (username.startsWith('z')) {
        username = parseInt(username.slice(1),10).toString();
      }
      fetch(`/api/user/${username}`)
      .then(res => res.json())
      .then(json => {

        if(json.username.password === this.refs.password.value){
          auth_bool = true;
          localStorage.setItem('session-username', JSON.stringify(username));
          localStorage.setItem('session-first_name', JSON.stringify(json.username.first_name));
          localStorage.setItem('current-semseter', JSON.stringify(json.username.currentTerm));
          this.setState({isAuthenticated : true});
          window.location.href = "/studentprofile"
        }else{
          window.alert("Incorrect username or password, please input again");
          window.location.href = "/"
        }
      })
      .catch((err) => {
        console.log(`Opz, something wrong, the error message is ${err}`);
      });
    }



    // get the user's pswd from DB, check if match with the input password by user, if true, redirect studentprofile, otherwise, remind ,
    render() {
      return (
        <div>
          {/* Login form */}
          <form className="login100-form validate-form " onSubmit={this.Authentication} name="loginform" >

            <div className="wrap-input100 validate-input" data-validate = "Enter username">
                <input className="input100" type="text" name="username" placeholder="User name" ref="username" required/>
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter password">
                <input className="input100" type="password" name="password" placeholder="Password" ref="password" required/>
                <span className="focus-input100"></span>
            </div>
            {/* Button part */}
            <div className="container-login100-form-btn">
                <button onClick={this.Authentication} className="login100-form-btn" type="submit" >
                    Login
                </button>
            </div>
          </form>
        </div>
      );
    }
  }


export default LoginForm;
