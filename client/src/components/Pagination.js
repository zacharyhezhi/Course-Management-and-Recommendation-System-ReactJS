import React, { Component } from 'react'

class Pagination extends Component {
	constructor(props){
		super(props)
		this.state = {
			nb_of_pages: 1,
			current_page: 1,
			pre_button: false,
			next_button: false,
		}
		this.handleClick = this.handleClick.bind(this)
	}

	// keep updating props from parent component <SearchResult/>
	componentWillReceiveProps(nextProps){
		this.forceUpdate();
		let current_page = this.state.current_page
		let nb_of_pages = nextProps.nb_of_pages
		let pre_button = (current_page === 1)? true : false;
		let next_button = (current_page === nb_of_pages)? true: false;
		this.setState({
			pre_button: pre_button,
			next_button: next_button,
		})
	}

	// get user's click, then change the current_page, finally call the function in parent component <SearchResult/>
	handleClick(type) {
		this.setState( prevState => {
			return {current_page: type==='next'? prevState.current_page + 1 : prevState.current_page - 1}
		}, () => {
			this.props.onUserClick(this.state.current_page);
		})
		
	}

  render() {
		
    return (
      <div>
			{/* Pagination button */}
        <div className="pages">
					<button type="button" className="previous_page" disabled={this.state.pre_button} onClick={this.handleClick.bind(this, 'previous')}>&lt;</button>
					<button type="submit" className="page1" disabled="true">{this.state.current_page}</button>
					<button type="button" className="next_page" disabled={this.state.next_button} onClick={this.handleClick.bind(this, 'next')}>&gt;</button>
				</div>

      </div>
    )
  }
}

export default Pagination
