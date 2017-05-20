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
					onChange={props.onSelectChange} >
					<option value="title">Title</option>
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
class ResultsRouter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			movies: [
				{
					title: 1,
					genre: 1,
					year: 1990,
					actors: 1,
					rating: 1
				},
				{
					title: 2,
					genre: 2,
					year: 1995,
					actors: 2,
					rating: 2
				},
				{
					title: 3,
					genre: 3,
					year: 2000,
					actors: 3,
					rating: 3
				},
				{
					title: 4,
					genre: 4,
					year: 2005,
					actors: 4,
					rating: 4
				},
				{
					title: 5,
					genre: 5,
					year: 2005,
					actors: 5,
					rating: 5
				}
			]
		}
	}

	render() {
		return (
	   		 <Router>
	   			 <Switch>
	   				 <Route path="/search" render={() => <SearchResults movies={this.state.movies} />} />
	   				 <Route path="/list" render={() => <MovieList movies={this.state.movies} />} />
	   			 </Switch>
	   		 </Router>
   	 	)
	}
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


/*
	component that contains all movie cards, it's state contains all the data
	pertaining to the movies in the collection
*/
const MovieList = (props) => {
	return (
		<div className="row">
			<div className="col-sm-8">
				{props.movies.map((movie, i) =>
					<MovieCard key={i} data={movie} />
				)}

				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addNewMovieModal">
					Add New Movie
				</button>


				<div className="modal fade" id="addNewMovieModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
				        		<h5 className="modal-title" id="exampleModalLabel">Add New Movie</h5>
				        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          			<span aria-hidden="true">&times;</span>
				        		</button>
				      		</div>
				      		<div className="modal-body">
								<form>
          							<div className="form-group">
							            <label htmlFor="movie-title" className="form-control-label">Movie Title:</label>
							            <input type="text" className="form-control" id="movie-title" />
							        </div>
									<div className="form-group">
							            <label htmlFor="genre" className="form-control-label">Genre:</label>
							            <input type="text" className="form-control" id="genre" />
							        </div>
									<div className="form-group">
							            <label htmlFor="year" className="form-control-label">Year Released:</label>
							            <input type="number" className="form-control" id="year" />
							        </div>
									<div className="form-group">
							            <label htmlFor="actors" className="form-control-label">Leading Actors:</label>
							            <input type="text" className="form-control" id="actors" />
							        </div>
									<div className="form-group">
							            <label htmlFor="rating" className="form-control-label">Movie Rating:</label>
										<select className="form-control custom-select"
											id="rating"
											defaultValue="pg" >
											<option value="g">G</option>
											<option value="pg">PG</option>
											<option value="pg13">PG-13</option>
											<option value="r">R</option>
										</select>
							        </div>
        						</form>
				      		</div>
				      		<div className="modal-footer">
				        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        		<button type="button" className="btn btn-primary">Save changes</button>
				      		</div>
				    	</div>
				  	</div>
				</div>

			</div>



		</div>
	)
}


/*
	component that displays each individual movie and it's data
*/
const MovieCard = (props) => {
	return(
		<div className="card">
			<p>{props.data.title}</p>
			<p>{props.data.genre}</p>
			<p>{props.data.year}</p>
			<p>{props.data.actors}</p>
			<p>{props.data.rating}</p>
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
				<SearchContainer
					onInputChange={this.handleSearchInputChange}
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
