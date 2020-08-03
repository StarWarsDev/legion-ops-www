import React, { useContext } from "react"
import Pages from "./Pages"
import DataContext from "context/DataContext"
import ThemeWrapper from "utility/ThemeWrapper"
import ActionBar from "common/ActionBar"
import NavigationDrawer from "common/NavigationDrawer"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import urls from "./constants/urls"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: urls.graphql,
})

function App() {
  const { auth, userSettings } = useContext(DataContext)

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = auth.idToken
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <ThemeWrapper themeColor={userSettings.themeColor}>
        <ActionBar />
        <NavigationDrawer />
        <Pages />
      </ThemeWrapper>
    </ApolloProvider>
  )
}

export default App
