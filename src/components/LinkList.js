import React, { Component } from 'react'
import Link from './Link'

// needed for GraphQL and Apollo
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// we use `export const FEED_QUERY` in order to make this query available to CreateLink.js
// vs. only `const FEED_QUERY`
export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`
// The GraphQL subscription to listen for changes to links, new links or deleted links
// GraphQl has queries, mutations, and subscriptions
const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`

class LinkList extends Component {
  
  // part of utilizing Apollo's cache capability to update Link.js's mutation
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // read the cache data from FEED_QUERY
    const data = store.readQuery({ query: FEED_QUERY })

    // retrive the link the user JUST voted for
    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    // take that data & write to the store
    store.writeQuery({ query: FEED_QUERY, data })
  }

  // GraphQL subscription implementation
  // This call opens up a websocket connection to the subscription server.
  // Listens if a link is created, a link is updated, a link is deleted
  _subscribeToNewLinks = subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newLink = subscriptionData.data.newLink
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        })
      }
    })
  }
    render() {
        return (
            // SEND THE QUERY & DISPLAYS THE RESULTS RECEIVED BACK 
            // IT'S BOTH A REQUEST AND A RECEIVER
            <Query query={FEED_QUERY}>
            {({ loading, error, data, subscribeToMore }) => {
                    // don't display anything if the query is still processing
                    if (loading) return <div>Fetching</div>
                    
                    // if there's an error, return this first
                    if (error) return <div>Error</div>

                    this._subscribeToNewLinks(subscribeToMore)

                    // this is the data we get back
                    const linksToRender = data.feed.links

                    return (
                        <div>
                            {linksToRender.map((link, index) => (
                              <Link
                                key={link.id}
                                link={link}
                                index={index}
                                updateStoreAfterVote={this._updateCacheAfterVote}
                              />
                            ))}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default LinkList