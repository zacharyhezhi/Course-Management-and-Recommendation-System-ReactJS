import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : ''
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(props){
        this.setState({
            username : localStorage.getItem('session-first_name').slice(1,-1)
        })
    }

    handleLogout(e) {
        localStorage.clear();
    }

    render() {
        const username = this.state.username;

        return (
            <div>
                <Helmet>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <title></title>
                    <meta name="description" content="navigationbar of Course System" />
                    <link rel="stylesheet" type="css" href="css/style.css"/>
                    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/1.4.0/jquery.js"></script>
                </Helmet>

                <header id="header" className="transparent-nav">
		            <div className="navigationbar">
		
					{/* <!-- Logo --> */}
			            <div className="navbar-brand" style={{padding : 0}}>
                            <a className="logo" href="/studentprofile" target="_parent">
					         <img src={require("../img/unsw.png")} alt="logo"/>
				            </a>
			            </div>
                    
				    {/* Navigation button */}
			            <nav id="nav">
                            <ul className="main-menu">
                                <li><Link to="/courseenrolment" target="_parent">Course Enrollment</Link></li>
                                <li><Link to="/coursereview" target="_parent">Course Review</Link></li>
                                <li><Link to="/pendinglist" target="_parent">Pending List</Link></li>
                                <li><span id="Username">{username}</span></li>
                                <li><Link to="/" onClick={this.handleLogout} target="_parent">Logout</Link></li>
                            </ul>
			            </nav>
		            </div>
	            </header>
            </div>

        );
    }
}


export default NavigationBar;