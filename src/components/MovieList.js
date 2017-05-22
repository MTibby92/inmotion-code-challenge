import React from 'react'
import { Link } from 'react-router-dom'


import MovieCard from './MovieCard'


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
					<div className="col-sm-4 offset-sm-4">
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addNewMovieModal">
						Add New Movie
					</button>
					</div>
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

export default MovieList
