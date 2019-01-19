import React, { Component } from 'react';
// import { Helmet } from "react-helmet";
// import { Link } from 'react-router-dom';

import PendingListSingle from "../components/PendingListSingle";

class PendingListForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            pendingCourseObj: [],
            toggledCourses: {},
        };
        this.handleChangeClick = this.handleChangeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        fetch(`/api/pendinglist/${localStorage.getItem('session-username').slice(1,-1)}`)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            let defauleToggledCourses = {};
            for (const course of json) {
                defauleToggledCourses[course.id] = false;
            }
            this.setState({
                pendingCourseObj : json,
                toggledCourses : defauleToggledCourses
            })
        })
    }

    renderCourses() {
        // Single row of pending list
        return this.state.pendingCourseObj.map((course) => (
            <PendingListSingle key={course.id} index={course.id} courseId={course.courseId} courseName={course.courseName} 
            courseDescription={course.courseDescription} prerequisiteChecked={course.isPre} 
            prerequisiteDesc={course.prerequisities_Desc} courseTerm = {course.courseTerm}
            handleChangeClick={this.handleChangeClick.bind(this, course.id)}/>
        ));
    }

    handleChangeClick(CourseId, isChecked) {
        //below is the code of updating the state for the toggled course in this.state.toggledcourses.
        // console.log(CourseId, isChecked);
        let newState = Object.assign({}, this.state)
        newState.toggledCourses[CourseId] = isChecked;
        this.setState(newState);
        console.log(this.state.toggledCourses);
    }

    handleSubmit(e) {
        e.preventDefault();
        var enroll_course_list = [];
        for(var key in this.state.toggledCourses){
            console.log(this.state.toggledCourses[key], this.state.pendingCourseObj[key-1].courseId)
            if(this.state.toggledCourses[key] === true){
                enroll_course_list.push({'_id' : this.state.pendingCourseObj[key-1].courseTerm + this.state.pendingCourseObj[key-1].courseId})
            }
        }
        var url = `http://127.0.0.1:5000/api/enrollmentinsert`;
        var data = {
            'pendinglist': enroll_course_list,
            'user': localStorage.getItem('session-username').slice(1,-1)
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        window.location.href="./studentprofile"
    }

    render() {
        return (
            // Pending list form
            <form className="pending_list" action="/studentprofile">
                 <table width="100%" className="zebra pending_table">
                    <tbody>
                        {this.renderCourses()}
                    </tbody>                  
                </table>
            {/* Button part */}
                <div className="button_part">
					<button onClick={this.handleSubmit} className="button">Proceed to Enroll</button>
						<a href="/studentprofile" className="button">Back</a>
				</div>                    

            </form>
        )
    }


}

export default PendingListForm;
