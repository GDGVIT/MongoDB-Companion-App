import React from 'react';
import MongoDBCompanionApp from './src/app';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { API_URI } from './src/config';

import { getCurrentConnectionAsync } from './src/controllers'

const httpLink = new HttpLink({
    uri: API_URI, 
});

const authLink = setContext(async (_, { headers }) => {

    const currentConnection = await getCurrentConnectionAsync();

    return {
        headers: {
            ...headers,
            mongodburi: currentConnection.mongoDBUri,
            database: currentConnection.database
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([authLink, httpLink, errorLink]);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});


export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <MongoDBCompanionApp />
            </ApolloProvider>
        );
    }
}