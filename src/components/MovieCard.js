import React from 'react'


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

export default MovieCard
