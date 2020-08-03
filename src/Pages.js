import React, { Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import LoadingWidget from "common/LoadingWidget"
import EditEvent from "./pages/Event/EditEvent"
import { Container } from "@material-ui/core"
const Home = lazy(() => import("pages/Home"))
const Settings = lazy(() => import("pages/Settings"))
const Tournaments = lazy(() => import("pages/Tournaments"))
const Event = lazy(() => import("pages/Event"))
const Callback = lazy(() => import("pages/Callback"))
const Info = lazy(() => import("pages/Info"))

function Pages() {
  return (
    <Container>
      <Suspense fallback={<LoadingWidget />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tournaments" component={Tournaments} />
          <Route exact path="/event/:id" component={Event} />
          <Route exact path="/event/:id/edit" component={EditEvent} />
          <Route path="/settings" component={Settings} />
          <Route path="/info" component={Info} />
          <Route path="/callback" component={Callback} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  )
}

export default Pages
