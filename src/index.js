import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// Apollo dependencies, in order to send data to & from GraphQL
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

// For Apollo --> ApolloClient to use the GraphQL subscription server
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// If apollo needs auth, it can grab the token from here
import { AUTH_TOKEN } from './constants'

import { BrowserRouter } from 'react-router-dom'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

// APOLLO === MIDDLEWARE
// Apollo configuration 
// MUST BE BEFORE const client
// in surrey, this info is in a seprate apollo.js file
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// web socket for apollo, required for GraphQL subscription capability
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        }
    }
})

// required for use of GraphQL subscription capability
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    // using Apollo auth capability
    authLink.concat(httpLink)
)

// Apollo configuration 
// If auth is required, it grabs the auth link
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
