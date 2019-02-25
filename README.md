# Tutorial GraphQL + React + Apollo App. 

A Hackernews clone - a basic React blog utilizing GraphQl to relay data to and from an external server. 

React/Apollo/GraphQL front end tutorial this uses: https://www.howtographql.com/react-apollo/1-getting-started/

React/Apollo/GraphQL repo (built & finished app): https://github.com/howtographql/react-apollo

Questions? Ask Emily. 

## Architecture

- React front end
- GraphQL middlware
- Prisma server (consumed by GraphQL)
- Tachyons library for CSS (http://tachyons.io/)


## 🛰 Resources: Wow! I want to learn more about GraphQL! 

- Tutorial (free, follow along guide) - React + Apollo + GraphQL: https://www.howtographql.com/react-apollo/1-getting-started/

- Tutorial (free, follow along guide) - GraphQL Server from scratch: https://www.howtographql.com/graphql-js/0-introduction

- Tutorial (free, video based) - React, Apollo, GraphQL: https://www.leveluptutorials.com/tutorials/full-stack-graphql-with-apollo-meteor-and-react

- Syntax podcast episode "GraphQL? Here is what you need to know!", https://syntax.fm/show/027/graphql-here-is-what-you-need-to-know (iTunes, Spotify, etc..)

## Setup 

- clone this repo
- cd into `/hackernews-react-apollo` 
- run `yarn install`

## Quick start

- cd into `hackernews-react-apollo/server`
- run `yarn start`. this starts your server (dependency).
- open a new terminal tab or window
- navigate to the root folder,  `/hackernews-react-apollo`
- run `yarn start`
- open [http://localhost:3000](http://localhost:3000) in your browser. you should see the home page with a 'hackernews' top banner running. 

### Something going wrong? 

- Ask Emily
- See tutorial for help here: https://www.howtographql.com/react-apollo/1-getting-started/

## Prisma Server

Your Prisma GraphQL database endpoint is live:

- HTTP:  https://us1.prisma.sh/emily-4cc201/prisma/dev
- WS:    wss://us1.prisma.sh/emily-4cc201/prisma/dev

### To start prisma server & the "playground"

- cd into `~/server
- run `yarn start`
- go to `http://localhost:4000/` in your browser, to open the GraphQL playground
- this interactive enviornment has built-in documentation (see right hand sidebar in browser)

### How to write your own queries & mutations in prisma playground

- https://www.prisma.io/docs/prisma-graphql-api/reference/mutations-qwe2/

