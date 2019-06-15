import reduxThunk from 'redux-thunk'

const middleware = []

if (process.env.NODE_ENV === 'development') {
	const invariant = require('redux-immutable-state-invariant').default

	middleware.push(invariant())
}

middleware.push(reduxThunk)

export default middleware
