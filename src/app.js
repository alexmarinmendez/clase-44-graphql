import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

import connectDB from './db.js'

const app = express()
connectDB()

async function start () {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start()
    // apolloServer.applyMiddleware({app: app})
    apolloServer.applyMiddleware({app})

    app.listen(8080, ()=> console.log("Server up"))

}

start()
