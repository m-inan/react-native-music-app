import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import AsyncStorage from '@react-native-community/async-storage'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@App:token')

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
