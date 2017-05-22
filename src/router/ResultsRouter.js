import React from 'react'
import {
    BrowserRouter as Router,
    Route,
	Switch
} from 'react-router-dom'


import SearchContainer from '../containers/SearchContainer'
import ShowListButton from '../components/ShowListButton'
import MovieList from '../components/MovieList'


/*
	Handles the routing for displaying either the results of a user's search
	or the list of movies they own. Because of the switch component, both
	will never be displayed at the same time. The Index route will only have
	the search bar
*/
export default class ResultsRouter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			movies: [
				{
					title: 'The Shawshank Redemption',
					genre: 'Drama',
					year: 1994,
					actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
					rating: 'R'
				},
				{
					title: 'The Dark Knight',
					genre: 'Action',
					year: 2008,
					actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
					rating: 'PG-13'
				},
				{
					title: 'The Lord of the Rings',
					genre: 'Adventure',
					year: 2003,
					actors: 'Elijah Wood, Viggo Mortensen, Ian McKellen',
					rating: 'PG-13'
				},
				{
					title: 'Forrest Gump',
					genre: 'Comedy',
					year: 1994,
					actors: 'Tom Hanks, Robin Wright, Gary Sinise',
					rating: 'PG-13'
				},
				{
					title: 'Back to the Future',
					genre: 'Adventure',
					year: 1985,
					actors: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
					rating: 'PG'
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
		// and history.push() or a state change to display the results, only accepts
        // exact matches between search term and movie value
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
