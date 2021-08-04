import React from 'react';
import {
  ApolloClient, 
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//Construct our GQL API Endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//Construct middleware that will attach JWT token to every request
//This will be in the authorization header 

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: ["_id", "username"]
      },
      Book: {
        keyFields: ["bookId", "authors"]
      }
    },
  }),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
          <Route exact path='/'>
            <SearchBooks />
          </Route>
          <Route exact path='/saved'>
            <SavedBooks />
          </Route>
      </Router>
    </ApolloProvider>
  );
}

export default App;
