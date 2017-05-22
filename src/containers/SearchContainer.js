import React from 'react'
import PropTypes from 'prop-types'

/*
	this section will always be present, allowing the user to search
	for a movie at any point
*/
export default class SearchContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.context.router.history.push('/search')
		this.props.onSubmit()
	}

	render() {
		return (
			<div className="jumbotron text-center">
				<h1 className="mb-3">Search your movie collection</h1>

				<div className="col-sm-6 offset-sm-3" >
					<form className="form-inline" onSubmit={this.handleSubmit}>
						<label className="sr-only" htmlFor="movieSearchBar">Movie Search Bar</label>
						<div className="input-group" >
							<div className="input-group-addon">
								<i className="fa fa-search" aria-hidden="true"></i>
							</div>
							<input type="text"
								className="form-control mr-sm-2"
								id="movieSearchBar"
								placeholder="Search..."
								value={this.props.inputValue}
							 	onChange={this.props.onInputChange} />
						</div>

						<label className="mr-sm-2" htmlFor="movieSearchDropdown">By:</label>
						<select className="custom-select mb-2 mr-sm-2 mb-sm-0"
							id="movieSearchDropdown"
							value={this.props.selectValue}
							onChange={this.props.onSelectChange} >
							<option value="title">Title</option>
							<option value="genre">Genre</option>
							<option value="year">Year</option>
						</select>

						<button type="submit" className="btn btn-primary" >
							{/* <Link to="/search" style={{color: 'white', textDecoration: 'none'}} >Search</Link> */}
							Search
						</button>
					</form>
				</div>
			</div>
		)
	}
}
// needed this feature to be able to redirect to /search from SearchContainer's handle click function
SearchContainer.contextTypes = {
	router: PropTypes.shape({
	    history: PropTypes.object.isRequired,
	  })
}
