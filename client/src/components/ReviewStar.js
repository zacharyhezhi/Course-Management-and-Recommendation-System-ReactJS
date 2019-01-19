import React, { Component } from 'react';

 
class ReviewStar  extends  Component{

    // init params
    constructor(props){
        super(props);
        this.state = {
            review: this.props.index,
        }
    }

    // 
    componentDidMount(){
        // set up star div limited scope
        let scope = document.getElementsByClassName(this.state.review);       
        for (let id = 0; id < scope.length; id++){
            let aSpan=scope[id].getElementsByClassName("star")[0];
            let aStxt=scope[id].getElementsByClassName("star-txt")[0];
            let aBstar=aSpan.getElementsByTagName("b");
            let arrBtxt=["Bad","Poor","Normal","Good","Perfect"];
            const CourseStars = this.props['CourseStar'];
            // display stars     
            aStxt.innerHTML=arrBtxt[CourseStars-1];
                for(let i=0;i<CourseStars;i++){
                    aBstar[i].style.backgroundPosition="0 0";
                }                   
        }
    }

    render(){
        // Review star for previous semenster
        return(
            <div className={this.state.review} id="review_star_style">
                <span className="star">
                    <b className="ct-star  ic-star-off"></b>
                    <b className="ct-star  ic-star-off"></b> 
                    <b className="ct-star  ic-star-off"></b>
                    <b className="ct-star  ic-star-off"></b>
                    <b className="ct-star  ic-star-off"></b>
                </span>
                <span className="star-txt"></span>
            </div>
        );

    }

}


export default ReviewStar;