import React from 'react'
import { Link } from 'react-router-dom'


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

export default ShowListButton
