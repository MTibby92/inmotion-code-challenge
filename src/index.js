import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
	Switch
} from 'react-router-dom'
import PropTypes from 'prop-types'


/*
	this section will always be present, allowing the user to search
	for a movie at any point
*/
class SearchContainer extends React.Component {
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
			<div className="jumbotron">
				<h1>Search your movie collection</h1>

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
						defaultValue={this.props.selectValue}
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
		)
	}
}
// needed this feature to be able to redirect to /search from SearchContainer's handle click function
SearchContainer.contextTypes = {
	router: PropTypes.shape({
	    history: PropTypes.object.isRequired,
	  })
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
			],
			newMovie: {
				title: '',
				genre: '',
				year: '',
				actors: '',
				rating: 'PG'
			},
			searchData: {
				searchQuery: '',
				searchType: 'title'
			},
			searchResults: []
		}
	}

	handleSearchInputChange = (e) => {
		this.setState({
			searchData: {
				...this.state.searchData,
				searchQuery: e.target.value
			}
		})
	}

	handleSearchSelectChange = (e) => {
		this.setState({
			searchData: {
				...this.state.searchData,
				searchType: e.target.value
			}
		})
	}

	handleSearchSubmit = (e) => {
		// this is where either the route redirect will happen using withRouter
		// and history.push() or a state change to display the results
		let tempSearchResults = []
		let movies = this.state.movies
		let query = this.state.searchData
		switch(query.searchType) {
			case 'title':
				movies.map((movie) => {
					if(movie.title == query.searchQuery) {
						tempSearchResults.push(movie)
					}
				})
				break
			case 'genre':
				movies.map((movie) => {
					if(movie.genre == query.searchQuery) {
						tempSearchResults.push(movie)
					}
				})
				break
			case 'year':
				movies.map((movie) => {
					if(movie.year == query.searchQuery) {
						tempSearchResults.push(movie)
					}
				})
				break
			default:
				return
		}
		this.setState({
			searchResults: tempSearchResults,
			searchData: {
				searchQuery: '',
				searchType: 'title'
			}
		})
	}

	// =================Search Data above, Add data below==============

	handleAddMovieChange = (e) => {
		switch (e.target.id) {
			case 'movie-title':
				this.setState({
					newMovie: {
						...this.state.newMovie,
						title: e.target.value
					}
				})
				break
			case 'genre':
				this.setState({
					newMovie: {
						...this.state.newMovie,
						genre: e.target.value
					}
				})
				break
			case 'year':
				this.setState({
					newMovie: {
						...this.state.newMovie,
						year: parseInt(e.target.value, 10)
					}
				})
				break
			case 'actors':
				this.setState({
					newMovie: {
						...this.state.newMovie,
						actors: e.target.value
					}
				})
				break
			case 'rating':
				this.setState({
					newMovie: {
						...this.state.newMovie,
						rating: e.target.value
					}
				})
				break
			default: return
		}
	}

	handleAddMovieSubmit = (e) => {
		e.preventDefault()
		this.setState((prevState) => ({
			movies: prevState.movies.concat(prevState.newMovie),
			newMovie: {
				title: '',
				genre: '',
				year: '',
				actors: '',
				rating: 'PG'
			}
		}))
	}

	handleMovieDelete = (e) => {
		let removeIndex = parseInt(e.target.getAttribute('data-index'), 10)
		this.setState((prevState) => ({
		    movies: prevState.movies.filter((_,i) => i !== removeIndex)
		}))
	}

	// currently not using yet, will come back to if there's time
	handleMovieEdit = (e) => {
		console.log(e.target)
		console.log(e.target.getAttribute('data-index'))
	}

	render() {
		return (
	   		 <Router>
				 <div className="container">
					 <SearchContainer
	 					onInputChange={this.handleSearchInputChange}
	 					inputValue={this.state.searchData.searchQuery}
	 					selectValue={this.state.searchData.searchType}
	 				 	onSelectChange={this.handleSearchSelectChange}
	 					onSubmit={this.handleSearchSubmit} />
					<Switch>
	   					 <Route exact path="/" component={ShowListButton} />
	   	   				 <Route path="/search" render={() =>
							 <MovieList movies={this.state.searchResults}
								 onChange={this.handleAddMovieChange}
								 onSubmit={this.handleAddMovieSubmit}
								 onDelete={this.handleMovieDelete}
								 onEdit={this.handleMovieEdit}
								 pageTitle="Search Results"
								 componentType="Search Results"
								 value={this.state.newMovie} />} />
	   	   				 <Route path="/list" render={() =>
	   						 <MovieList movies={this.state.movies}
	   							 onChange={this.handleAddMovieChange}
	   							 onSubmit={this.handleAddMovieSubmit}
	   							 onDelete={this.handleMovieDelete}
	   							 onEdit={this.handleMovieEdit}
								 pageTitle="My Movie List"
								 componentType="Movie List"
	   							 value={this.state.newMovie} />} />
	   	   			 </Switch>
				 </div>
	   		 </Router>
   	 	)
	}
 }


const ShowListButton = (props) => {
	return (
		<div className="row">
			<div className="col-sm-2 offset-sm-5">
				<button className="btn btn-primary">
					<Link to="/list" style={{color: 'white', textDecoration: 'none'}}>View List of Movies</Link>
				</button>
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
			{props.pageTitle == 'Search Results' ? (
				<div className="col-sm-2 offset-sm-5">
					<button className="btn btn-primary mb-3">
						<Link to="/list" style={{color: 'white', textDecoration: 'none'}} >Go to Full List</Link>
					</button>
				</div>
			) : (
				null
			)}

			<div className="col-sm-6 offset-sm-3">
				{/* Page Title is dependent on whether it was searched for or the whole list */}
				<h2 className="text-center" style={{marginBottom: '1rem'}} >{props.pageTitle}</h2>

				<div className="" >
					{props.movies.map((movie, i) =>
						<MovieCard key={i}
							index={i}
							data={movie}
							componentType={props.componentType}
							onDelete={props.onDelete}
							onEdit={props.onEdit}
							onCardSubmit={props.onCardSubmit} />
					)}
				</div>

				{/* the add new movie button is only available when the /list route is hit, not the
					search route */}
				{props.pageTitle == 'My Movie List' ? (
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addNewMovieModal">
						Add New Movie
					</button>
				) : (
					null
				)}


				{/* modal only needs to be rendered on the full list route, not the search route */}
				{props.pageTitle == 'My Movie List' ? (
					<div className="modal fade" id="addNewMovieModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
					        		<h5 className="modal-title" id="exampleModalLabel">Add New Movie</h5>
					        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					          			<span aria-hidden="true">&times;</span>
					        		</button>
					      		</div>
								<form onSubmit={props.onSubmit} >
					      			<div className="modal-body">
	          							<div className="form-group">
								            <label htmlFor="movie-title" className="form-control-label">Movie Title:</label>
								            <input required type="text" className="form-control" id="movie-title" onChange={props.onChange} value={props.value.title} />
								        </div>
										<div className="form-group">
								            <label htmlFor="genre" className="form-control-label">Genre:</label>
								            <input required type="text" className="form-control" id="genre" onChange={props.onChange} value={props.value.genre} />
								        </div>
										<div className="form-group">
								            <label htmlFor="year" className="form-control-label">Year Released:</label>
								            <input required type="number" className="form-control" id="year" onChange={props.onChange} value={props.value.year} />
								        </div>
										<div className="form-group">
								            <label htmlFor="actors" className="form-control-label">Leading Actors:</label>
								            <input required type="text" className="form-control" id="actors" onChange={props.onChange} value={props.value.actors} />
								        </div>
										<div className="form-group">
								            <label htmlFor="rating" className="form-control-label">Movie Rating:</label>
											<select className="form-control custom-select"
												id="rating"

												required
												onChange={props.onChange}
												value={props.value.rating}>
												<option value="G">G</option>
												<option value="PG">PG</option>
												<option value="PG-13">PG-13</option>
												<option value="R">R</option>
											</select>
								        </div>
						      		</div>
						      		<div className="modal-footer">
						        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
						        		<button type="submit" className="btn btn-primary" data-toggle="modal"
											data-target="#addNewMovieModal">Add Movie</button>
						      		</div>
								</form>
					    	</div>
					  	</div>
					</div>
				) : (
					null
				)}
			</div>
		</div>
	)
}


/*
	component that displays each individual movie and it's data
*/
const MovieCard = (props) => {
	return(
		<div className="card" style={{marginBottom: '1rem'}}>
			{/* <img className="card-img" src="http://placehold.it/200x100"/> */}
			<div className="card-block">
				<h4 className="card-title" >Title: {props.data.title}</h4>
				<hr/>
				<p className="card-text" >Genre: {props.data.genre}</p>
				<p className="card-text" >Release Year: {props.data.year}</p>
				<p className="card-text" >Lead Actors: {props.data.actors}</p>
				<p className="card-text" >Rating: {props.data.rating}</p>
				{/* <button className="btn btn-primary" data-index={props.index} onClick={props.onEdit} >Edit</button> */}

				{/* only render delete button if it's part of the full movie list */}
				{props.componentType == 'Movie List' ? (
					<button className="btn btn-danger ml-2" data-index={props.index} onClick={props.onDelete} >Delete</button>
				) : (
					null
				)}
			</div>
		</div>
	)
}


/*
	this component will host all the other components and the highest level
	state necessary
*/
const App = (props) => {
	return (
		<ResultsRouter />
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
