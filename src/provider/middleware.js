import reduxThunk from 'redux-thunk'

const middleware = []

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const invariant = require('redux-immutable-state-invariant').default

  middleware.push(invariant())
  middleware.push(createLogger({ collapsed: true }))
}

middleware.push(reduxThunk)

export default middleware
