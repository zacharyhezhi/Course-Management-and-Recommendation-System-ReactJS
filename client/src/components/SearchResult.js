import React, { Component } from 'react'

import SearchBar from './SearchBar';
import CourseCard from './CourseCard';
import Pagination from './Pagination';

class SearchResult extends Component {
	constructor(props){
		super(props)
		this.state = {
			filterText: '',
			course_list: [],
			nb_of_pages: null,
			start_index: 0,
			end_index: 8,
			recommendation: true,
			recomList: [],
			enrollment: null,
		}
	}

	// get recommendation courses
	componentDidMount(){
		const currentSemester = localStorage['current-semseter'];
		const userID = localStorage['session-username'].slice(1,-1);
		let resultList = [];
		let enrollList = [];
		JSON.parse(localStorage.getItem('enrollment')).forEach(element => {
			enrollList.push(element['code'])
		});


		fetch('/api/recommendation/' + userID)
		.then(res => res.json())
		.then(recomList => {
			for (let i = 0; i < recomList.length; i ++){
				//console.log(recomList[i]);
				if (recomList[i]._id[0] === currentSemester && !enrollList.includes(recomList[i]._id.slice(1))){
					resultList.push(recomList[i]);
				}
			}
			console.log(resultList)
			this.setState({
				course_list: resultList,
				recomList: resultList,
				nb_of_pages : Math.ceil(resultList.length / 8)
			})
		})
		.catch((err) => {
			console.log(`Opz, something wrong, the error message is ${err}`);
		});
		
	}

	// use fetch method to get courses' result from database according to filtertext
	getCourseResult(filterText) {
		if(filterText.length !== 0){
			console.log(filterText)
			fetch('/api/search/' + filterText)
			.then(res => {
				let result = res.json()
				//console.log(result)
				return result
			})
			.then(json => {
				this.setState({
					course_list: json,
					recommendation: false,
					nb_of_pages: Math.ceil(json.length / 8)
				})
				this.makePagination();
			})
		} else {
			this.setState({
				course_list: this.state.recomList,
				recommendation: true,
				nb_of_pages: Math.ceil(this.state.recomList / 8)
			})
		}
	}

	// get filterText from child component <SearchBar/>
	handleUserInput(filterText) {
		this.setState({
			filterText: filterText
		});
		this.getCourseResult(filterText)
	}

	// get specific course card from child component from <CourseCard/> based on current_page
	renderCourseCard(start_index, end_index) {
		if ( start_index === undefined && end_index === undefined){
			start_index = 0;
			end_index = 8;
		}
		// console.log('start', start_index, 'end', end_index);
		// console.log('state course', this.state.course_list)
		return this.state.course_list.slice(start_index, end_index).map((course) => 
		// This is the course card component for each course
			<CourseCard key={course._id} course_id={course._id} full_name={course.full_name} description={course.description} star={course.code.avg_star}/>
		)
	}

	// calulate number of pages
	makePagination() {
		const course_list = this.state.course_list;
		if ( course_list.length <= 8 ){
			this.setState({nb_of_pages: 1})
		} else {
			let nb_of_pages = Math.ceil(course_list.length / 8)
			this.setState({nb_of_pages: nb_of_pages});
		}
		//this.renderCourseCard(0, 8)
	}

	// get current_page from child component <Pagination/>
	handlePage(current_page) {
		this.setState({
			current_page: current_page
		})
		let start_index = (current_page - 1) * 8;
		let end_index = ( (start_index + 8) > this.state.course_list.length) ? this.state.course_list.length : (start_index + 8);
		this.setState({
			start_index: start_index,
			end_index: end_index
		})
	}


	// ----------------------------------------------------function aaa is a test model for recom---------------------
	getRecommendation(){
		const currentSemester = localStorage['current-semseter'];
		const userID = localStorage['session-username'].slice(1,-1);
		let resultList = [];

		fetch('/api/recommendation/' + userID)
		.then(res => {
			let recomList = res.json();
			recomList.then(
				//console.log(result))
				function(recomList){
					//console.log(recomList)
					for (let i = 0; i < recomList.length; i ++){
						//console.log(recomList[i]);
						if (recomList[i]._id[0] === currentSemester){
							resultList.push(recomList[i]);
						}
					}
					// console.log(resultList)
					return(resultList)
				});
		})
	}

	getRandom(min, max) {
		return (Math.random() * (max-min) + min).toPrecision(3);
	}

	// handle header text
	handleHeader() {
		if (this.state.recommendation === true) {
			return (
				<div className="section-header">
					<h2 className="notice">Below are your course recommendations:</h2>
				</div>
			)
		} else {
			return (
				<div className="section-header">
					<h2 className="notice">Below are your search results:</h2>
				</div>
			)
		}
	}

  render() {
	//   If there is nothing in the search bar, We will recommend the course for you and this is the loading part
		if(this.state.recomList.length === 0) {
			return (
			<div className="section-header">
				<h2 className="notice">Loading Course Recommendations...</h2>
			</div>
		)}
		console.log(this.state)
    return (
    <div>
		{/* Searchbar part */}
		<SearchBar 
			filterText={this.state.filterText} 
			onUserInput={this.handleUserInput.bind(this)} 
		/>
        {this.handleHeader()}
        <div className="search_result">
			<form className="enroll">
				{this.renderCourseCard(this.state.start_index, this.state.end_index)}
				{/* Pagination Sector */}
				<Pagination 
				nb_of_pages={this.state.nb_of_pages}
				onUserClick={this.handlePage.bind(this)}
				/>
			</form>
		</div>
    </div>
    )
  }
}

export default SearchResult
