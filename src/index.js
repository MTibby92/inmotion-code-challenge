import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
	Switch
} from 'react-router-dom'


/*
	this section will always be present, allowing the user to search
	for a movie at any point
*/
const SearchContainer = (props) => {
	return (
		<div className="jumbotron">
			<h1>Search your movie collection</h1>

			<form className="form-inline" onSubmit={props.onSubmit}>
				<label className="sr-only" htmlFor="movieSearchBar">Movie Search Bar</label>
				<div className="input-group" >
					<div className="input-group-addon">
						<i className="fa fa-search" aria-hidden="true"></i>
					</div>
					<input type="text"
						className="form-control mr-sm-2"
						id="movieSearchBar"
						placeholder="Search..."
						value={props.inputValue}
					 	onChange={props.onInputChange} />
				</div>

				<label className="mr-sm-2" htmlFor="movieSearchDropdown">By:</label>
				<select className="custom-select mb-2 mr-sm-2 mb-sm-0"
					id="movieSearchDropdown"
					defaultValue={props.selectValue}
					onChange={props.onSelectChange}>
					<option value="title" >Title</option>
					<option value="genre">Genre</option>
					<option value="year">Year</option>
				</select>

				<button type="submit" className="btn btn-primary" >Search</button>
			</form>
		</div>
	)
}

/*
	Handles the routing for displaying either the results of a user's search
	or the list of movies they own. Because of the switch component, both
	will never be displayed at the same time. The Index route will only have
	the search bar
*/
const ResultsRouter = (props) => {
	 return (
		 <Router>
			 <Switch>
				 <Route path="/search" component={SearchResults} />
				 <Route path="/list" component={MovieList} />
			 </Switch>
		 </Router>
	 )
 }

const SearchResults = (props) => {
	return (
		<div className="row">
			<div className="col-sm-8">
				<h3>Search Results go here</h3>
			</div>
		</div>
	)
}


const MovieList = (props) => {
	return (
		<div className="row">
			<div className="col-sm-8">
				<h3>Movie List goes here</h3>
			</div>
		</div>
	)
}


/*
	this component will host all the other components and the highest level
	state necessary
*/
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchQuery: '',
			searchType: 'title'
		}
	}

	handleSearchInputChange = (e) => {
		console.log(e.target.value)
		this.setState({
			searchQuery: e.target.value
		})
	}

	handleSearchSelectChange = (e) => {
		console.log(e.target.value)
		this.setState({
			searchType: e.target.value
		})
	}

	handleSearchSubmit = (e) => {
		e.preventDefault()
		// this is where either the route redirect will happen using withRouter
		// and history.push() or a state change to display the results
		this.setState({
			searchQuery: '',
			searchType: 'title'
		})
	}

	render() {
		return (
			<div className="container">
				<SearchContainer onInputChange={this.handleSearchInputChange}
					inputValue={this.state.searchQuery}
					selectValue={this.state.searchType}
				 	onSelectChange={this.handleSearchSelectChange}
					onSubmit={this.handleSearchSubmit} />
				<ResultsRouter />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
