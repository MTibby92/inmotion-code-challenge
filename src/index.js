import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


const SearchContainer = (props) => {
	return (
		<div className="jumbotron">
			<h1>Search your movie collection</h1>
		</div>
	)
}


class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="container">
				<SearchContainer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
