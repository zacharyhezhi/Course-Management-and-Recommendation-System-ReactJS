import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import ReviewFormDynamic from './ReviewFormDynamic';


class CourseReview extends Component {

    // initial params
    constructor(props){
        super(props);
        this.state = {
            currentTerm : this.props.currentTerm,
            seme_1: '',
            seme_2: '',
            seme_3: '',
            term_1: [],
            term_2: [],
            term_3: [],
        }
    }

    componentWillMount(props){
        // get usename from session
        let username = JSON.parse(localStorage.getItem('session-username'));

        // get current term 
        fetch('/api/user/' + username)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    currentTerm : json.username.currentTerm,
                })
            })
        
        // get review history 
        fetch('/api/review/' + username)
        .then(res => res.json())
        .then(json => {  
            for ( let course of json){
                // Divide semesters by term
                if (course.term === 1){
                    this.setState({
                        term_1: [...this.state.term_1, {'code': course.code, 'star': course.star,'name': course.name, 'term': course.term}],
                        seme_1: 'Semester 1',
                    })
                }
                else if (course.term === 2){
                    this.setState({
                        term_2: [...this.state.term_2, {'code': course.code, 'star': course.star,'name': course.name, 'id': course.id,'term': course.term}],
                        seme_2: 'Semester 2',
                    })
                }else if(course.term === 3){
                    this.setState({
                        term_3: [...this.state.term_3, {'code': course.code, 'star': course.star,'name': course.name, 'id': course.id,'term': course.term}],
                        seme_3: 'Semester 3',
                    })
                }   
            }
        })
        .catch((err) => {
            console.log(`Opz, something wrong, the error message is ${err}`);
        })

    };

    
    // check if it follows dynamic stars dividing by terms
    // term one 
    semesterTitleDivision_1 = () => {
        if (this.state.currentTerm === 1){
            return this.state.term_1.map((Course) => (
                <ReviewFormDynamic key={Course.code} CourseCode={Course.code} CourseTerm = {Course.term} CourseName={Course.name} CourseStar={Course.star} onStar = {this.getStars.bind(this)} />
            ));        
        }
        else{
            
            return this.state.term_1.map((Course) => (
                <ReviewForm key={Course.code} CourseCode={Course.code} CourseName={Course.name} CourseStar={Course.star} />
            ));
        };
    }


    // term two 
    semesterTitleDivision_2 = () => {
        if (this.state.currentTerm === 2){
            return this.state.term_2.map((Course) => (
                <ReviewFormDynamic key={Course.code} CourseCode={Course.code} CourseTerm = {Course.term} CourseName={Course.name} CourseStar={Course.star} onStar = {this.getStars.bind(this)} />
            ));         
        }
        else{
            
            return this.state.term_2.map((Course) => (
                <ReviewForm key={Course.code} CourseCode={Course.code} CourseName={Course.name} CourseStar={Course.star} />
            ));
        };
    }

    // term three
    semesterTitleDivision_3 = () => {
        if (this.state.currentTerm === 3){
            return this.state.term_3.map((Course) => (
                <ReviewFormDynamic key={Course.code} CourseCode={Course.code} CourseTerm = {Course.term} CourseName={Course.name} CourseStar={Course.star} onStar = {this.getStars.bind(this)} />
            ));        
        }
        else{
            
            return this.state.term_3.map((Course) => (
                <ReviewForm key={Course.code} CourseCode={Course.code} CourseName={Course.name} CourseStar={Course.star} />
            ));
        };
    }


    // update stars fetching to database
    getStars (courseCode,star,courseTerm){
        let username = JSON.parse(localStorage.getItem('session-username'));
        var data = {
            'code':courseCode,
            'star':star,
            'term':courseTerm,
            'user':username
        };
        var url = '/api/reviewinsert';
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        
    }

    // switch two types of bottom btn style
    whichBottomStyle = () => {
        if (this.state.currentTerm === 1){
            if(this.state.term_1.length !== 0){
                return false;
            }
        }
        if (this.state.currentTerm === 2){
            if(this.state.term_2.length !== 0){
                return false;
            }
        }
        if (this.state.currentTerm === 3){
            if(this.state.term_3.length !== 0){  
                return true;
            }
        }
    }

    // btn style one
    bottomBtn_1 = () => {
        return (
            <div className = "button_part">
                <button type="submit" className = "button" onClick = {this.successSubmit}>Submit</button>
                <button onClick = {this.backOnclick} className = "button">Back</button>
            </div>
        )
    }

    // btn style two
    bottomBtn_2 = () => {
        return (
            <div className = "button_part">
                <button onClick = {this.backOnclick} className = "button">Back</button>
            </div>
        )
    }




    //back to StudentProfile
    backOnclick(){
        window.location.href='/studentprofile';
    }

    //submit successful
    successSubmit(){
        alert('Successful Submit!');
        window.location.href='/studentprofile';
    }

    
    render() {
        return (
            <div>   
                {/* Table for Semenster 1 */}
                <form action = "/" method = "POST" className = "course_review">
                    <div className="section-header">
                        <h2>{this.state.seme_1}</h2>
                    </div>
                    <table width="100%" className="zebra review_table">
                    <tbody>
                        {this.semesterTitleDivision_1()}
                    </tbody>
                    </table>
                </form> 
                {/* Table for Semenster 2 */}
                <form action = "/" method = "POST" className = "course_review">
                    <div className="section-header">
                        <h2>{this.state.seme_2}</h2>
                    </div>
                    <table width="100%" className="zebra review_table">
                    <tbody>
                        {this.semesterTitleDivision_2()}
                    </tbody>
                    </table>
                </form>
                {/* Table for Semenster 3 */}
                <form action = "/" method = "POST" className = "course_review">
                    <div className="section-header">
                        <h2>{this.state.seme_3}</h2>
                    </div>
                    <table width="100%" className="zebra review_table">
                    <tbody>
                        {this.semesterTitleDivision_3()}
                    </tbody>
                    </table>
                </form>
                {/* Button part */}
                {this.whichBottomStyle() ? this.bottomBtn_1() : this.bottomBtn_2()}

            </div> 
        );
    }
  }

  export default CourseReview;