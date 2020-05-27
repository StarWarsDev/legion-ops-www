import React from "react"
import { Router } from "@reach/router"
import { Link as GLink } from "gatsby"
import { Link } from "@material-ui/core"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { isAuthenticated, login, getProfile, logout } from "../utils/auth"

const Home = ({ user }) => {
  const name = user.name ? user.name : "friend"
  return (
    <>
      <SEO title={`Profile - ${name}`} />
      <p>Hi, {name}!</p>
    </>
  )
}
const Edit = () => <p>Editing My Profile</p>

export default function Profile() {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <Layout>
      <nav>
        <Link component={GLink} to="/profile">
          My Profile
        </Link>{" "}
        <Link component={GLink} to="/profile/edit">
          Edit My Profile
        </Link>{" "}
        <Link
          href="#"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </Link>
      </nav>
      <Router>
        <Home path="/profile" user={user} />
        <Edit path="/profile/edit" />
      </Router>
    </Layout>
  )
}
