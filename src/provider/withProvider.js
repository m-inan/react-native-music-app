import React from 'react'

import { Provider } from 'react-redux'

function withProvider(Component, store) {
	class Enhance extends React.Component {
		static options = Component.options

		render() {
			return (
				<Provider store={store}>
					<Component {...this.props} />
				</Provider>
			)
		}
	}

	return Enhance
}

export default withProvider
