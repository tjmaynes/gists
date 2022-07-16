import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const App = ({apiUri}) => {
  const apiClient = new ApolloClient({
      uri: apiUri
  });

  return (
      <ApolloProvider client={apiClient}>
        <div id="root">
          <h1>Learning GraphQL</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
  );
}

export default App;
