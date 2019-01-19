import React, { Component } from 'react';
import ReviewStar from './ReviewStar';

 
class ReviewForm  extends  Component{
    // init params
    constructor(props){
        super(props);
        this.state = {
            CourseCode: this.props.CourseCode,
            CourseStars: this.props.CourseStar,
            CourseName: this.props.CourseName,
            CourseTerm: this.props.CourseTerm,
            CountStars: 0,                                            // the star given by user.
        }
    }

    // remove the init state when data transmission
    deleteUndefined(){
        if(this.state !== undefined){
            return(<ReviewStar key={this.state.CourseCode} index ={this.state.CourseCode} CourseCode={this.state.CourseCode} CourseStar={this.state.CourseStars} />)

        }
    }

    
    render(){
        return(
            //  Review form for previous semenster
                <tr className="review_static">
                    <td width="10%" id="CourseID">{this.state.CourseCode}</td>
                    <td width="70%" id="CourseDitails">{this.state.CourseName}</td>
                    <td width="20%" id="Star">
                    {this.deleteUndefined()}
                    </td>	
                </tr> 
        );

    }

}


export default ReviewForm;


