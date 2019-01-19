import React, { Component } from 'react';
import { fail } from 'assert';


class PendingListSingle extends Component {
    constructor(props){
        super(props)
        this.state = {
            index: this.props.index,
            courseId: this.props.courseId,
            courseName: this.props.courseName,
            courseDescription: this.props.courseDescription,
            isChecked : true,
            prerequisiteChecked: this.props.prerequisiteChecked,
            prerequisiteDesc: this.props.prerequisiteDesc,
            courseTerm: this.props.term,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    componentDidMount() {
        if(this.state.prerequisiteChecked === false){
            document.getElementById(this.props.index).disabled = true;
        }
    }

    handleClick = () => {
        // console.log(this.state.isChecked);
        this.setState({
            isChecked: !this.state.isChecked,
        });
        // console.log(this.state.isChecked);
        this.props.handleChangeClick(this.state.isChecked);
    }

    handleDelete = () => {
        let delete_course_list = [];
        delete_course_list.push({'_id': this.props.courseTerm + this.props.courseId})
        let url = `http://127.0.0.1:5000/api/pendinglistdelete/${localStorage.getItem('session-username').slice(1,-1)}`;
        let data = {pendinglist: delete_course_list};

        fetch(url, {
            method : 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        window.location.href="./pendinglist";

    }



    render() {
        // judge whether can enroll the course
        const failPrerequisite = <h4 style={{color:'#ff4d4d'}}>Can not enroll! You probably need to check if you satisfy the prerequisite: {this.props.prerequisiteDesc ? this.props.prerequisiteDesc.slice(14): null}</h4>
        return (
            // single row of pending list
            <tr>
                <td width="5%"><input type="checkbox" id={this.props.index} name=""  onClick={this.handleClick}/></td>
                <td width="10%" id="CourseID">{this.props.courseId}</td>
                <td width="12%" id="CourseName">{this.props.courseName}</td>
                <td width="65%" id="CourseDescription">{this.props.prerequisiteChecked ? this.props.courseDescription : failPrerequisite}</td>
                <td width="10%" id="Remove_Course"><input type="button" value="Remove" className="Remove_button" onClick={this.handleDelete}/></td>
            </tr>
        )
    }
}

export default PendingListSingle;
