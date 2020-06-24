import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"
import { silentAuth } from "./auth"

class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleSessionCheck = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleSessionCheck)
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    )
  }
}

const client = new ApolloClient({
  uri: "http://legion-ops.herokuapp.com/graphql",
  fetch,
})

export const wrapRootElement = ({ element }) => {
  return (
    <SessionCheck>
      <ApolloProvider client={client}>{element}</ApolloProvider>
    </SessionCheck>
  )
}
