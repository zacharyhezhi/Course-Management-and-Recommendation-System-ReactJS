import React, { Component } from 'react';
import ReviewStarDynamic from './ReviewStarDynamic';


 
class ReviewFormDynamic  extends  Component{

    // init params
    constructor(props){
        super(props);
        this.state = {
            CourseCode: this.props.CourseCode,
            CourseStars: this.props.CourseStar,
            CourseName: this.props.CourseName,
            CourseTerm: this.props.CourseTerm,
            CountStars: 0,                                          
        }
    }

    // transmit updated stars 
    getStars(star) {
        this.props.onStar(this.state.CourseCode,star,this.state.CourseTerm);
    }

    
    render(){
        return(
            //  This is review form for current semenster
                <tr className="review_dynamic">
                    <td width="10%" id="CourseID">{this.state.CourseCode}</td>
                    <td width="70%" id="CourseDitails">{this.state.CourseName}</td>
                    <td width="20%" id="Star">
                    {/* Review star for current semenster */}
                    <ReviewStarDynamic key={this.state.CourseCode} index ={this.state.CourseCode}  CourseStars={this.state.CourseStars} onStar={this.getStars.bind(this)}/>
                    
                    </td>	
                </tr> 
        );

    }

}


export default ReviewFormDynamic;