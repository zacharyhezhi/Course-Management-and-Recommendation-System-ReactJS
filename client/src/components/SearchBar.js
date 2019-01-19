import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this);
}

  // componentDidUpdate(prevProps, prevState){
  //   if(this.props.filterText !== prevProps.filterText){
  //     this.handleChange();
  //   }
  // }

  // get filtertext from users' input and call the parent component <SearchResult/> function
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }

  render() {
    return (
      <div>
        {/* Input part for search bar */}
        <form className="search_bar">
          <input type="text" name="" className="search"
          placeholder="Search Course Code or Name..." value={this.props.filterText} ref='filterTextInput' onChange={this.handleChange}/>
        </form> 
      </div>
    )
  }
}

export default SearchBar
