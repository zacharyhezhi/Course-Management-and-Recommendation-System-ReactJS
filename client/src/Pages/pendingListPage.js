
import React, {Component} from 'react';
import { Helmet } from "react-helmet";
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import NavigationBar from '../components/NavigationBar';
import PendingListForm from '../components/PendingListForm';


const PendingListBackground= (props) => 
		<div className="Sbody">
    			<div id="contact" className="section">
             <div className="container">
                <div className="row">
                  <div className="section-header">
                    <h1>Pending Course List</h1>
                  </div>
                    <PendingListForm />
                </div>
             </div>
          </div>
    </div>



class PendingListPage extends Component {
  constructor(){
    super();
    this.state= {
      id:"",
      courseName:""
		}
  }


// componentWillMount(props){
//   fetch('/api/courses')
//   .then(response => response.json())
//   .then(json => this.setState( { id: json.id , courseName: json.CourseName})
//   .catch((err) => {
//     console.log(`Opz, something wrong, the error message is ${err}`);
//   });
// }



render() {
    return (
      <div>
      <Helmet>
          <meta charset="utf-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          {/* <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> */}
          <title>Pending List</title>
          {/* <!-- Bootstrap --> */}
          <link type="css" rel="stylesheet" href="css/bootstrap.min.css"/>
          {/* <!-- Font Awesome Icon --> */}
          <link rel="font" href="css/font-awesome.min.css"/>
          {/* <!-- Custom stlylesheet --> */}
          <link type="css" rel="stylesheet" href="css/style.css"/>
      </Helmet>
      {/* Navigationbar part */}
        <NavigationBar/>
        {/* Pending list part */}
        <PendingListBackground/>     
      </div>
  );
  }
}
export default PendingListPage;


