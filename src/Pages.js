import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoadingWidget from 'common/LoadingWidget';
const Home = lazy(() => import('pages/Home'));
const Settings = lazy(() => import('pages/Settings'));
const Tournaments = lazy(() => import('pages/Tournaments'));
const Callback = lazy(() => import('pages/Callback'));
const Info = lazy(() => import('pages/Info'));

function Pages() {
  return (
    <Suspense fallback={<LoadingWidget />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tournaments" component={Tournaments} />
        <Route path="/settings" component={Settings} />
        <Route path="/info" component={Info} />
        <Route path="/callback" component={Callback} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Pages;
