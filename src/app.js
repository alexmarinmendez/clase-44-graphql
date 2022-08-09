import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import reminder from './Reminders.js'

const app = express()
const schema = buildSchema(`
    type Reminder {
        id: Int
        title: String
        description: String
        status: String
    }
    type Query {
        reminders: [Reminder]
    }
    type Mutation {
        createReminder(title:String, description:String): Reminder
        deleteReminders: [Reminder]
        completeReminder(id: Int): Reminder
    }
`)

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        reminders: () => reminder.getReminders(),
        createReminder: (data) => reminder.createReminder(data),
        deleteReminders: () => reminder.deleteReminders(),
        completeReminder: (data) => reminder.completeReminder(data)
    },
    graphiql: true
}))

app.listen(8080, ()=> console.log("Server up"))