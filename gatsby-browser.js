import React from "react"
import { silentAuth } from "./src/utils/auth"

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

export const wrapRootElement = ({ element }) => {
  return <SessionCheck>{element}</SessionCheck>
}
