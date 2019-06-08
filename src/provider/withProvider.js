import React from 'react'

import { ApolloProvider } from 'react-apollo-hooks'
import { Provider } from 'react-redux'

import defaultClient from '../graphql/client'

function withProvider(Component, store, client = defaultClient) {
  class Enhance extends React.Component {
    static options = Component.options

    render() {
      return (
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Component {...this.props} />
          </ApolloProvider>
        </Provider>
      )
    }
  }

  return Enhance
}

export default withProvider
