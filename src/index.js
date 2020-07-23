import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider
} from "@material-ui/pickers"
import { DataProvider } from 'context/DataContext';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import urls from "./constants/urls";

const client = new ApolloClient({
  uri: urls.graphql,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ApolloProvider client={client}>
      <Router>
        <DataProvider>
          <App />
        </DataProvider>
      </Router>
    </ApolloProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
