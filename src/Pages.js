import React, { Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import LoadingWidget from "common/LoadingWidget"
import { Container } from "@material-ui/core"
const Home = lazy(() => import("pages/Home"))
const Settings = lazy(() => import("pages/Settings"))
const Tournaments = lazy(() => import("pages/Tournaments"))
const Event = lazy(() => import("pages/Event"))
const Callback = lazy(() => import("pages/Callback"))
const Info = lazy(() => import("pages/Info"))
const EditEvent = lazy(() => import("pages/Event/EditEvent"))
const AddDay = lazy(() => import("pages/Event/EditEvent/AddDay"))
const MyEvents = lazy(() => import("pages/MyEvents"))

function Pages() {
  return (
    <Container>
      <Suspense fallback={<LoadingWidget />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/my-events" component={MyEvents} />
          <Route exact path="/tournaments" component={Tournaments} />
          <Route exact path="/event/:id" component={Event} />
          <Route exact path="/event/:id/edit" component={EditEvent} />
          <Route exact path="/event/:id/add-day" component={AddDay} />
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
