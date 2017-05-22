import React from 'react'
import ReactDOM from 'react-dom'

import ResultsRouter from './router/ResultsRouter'


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
