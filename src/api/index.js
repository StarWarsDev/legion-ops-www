import { ApolloClient, InMemoryCache } from "@apollo/client";
import { eventsQuery } from "./event-queries";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "production"
    ? "https://legion-ops.herokuapp.com/graphql"
    : "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

async function queryEvent(idToken, eventId) {
  return {
    id: eventId,
    type: "FFGOP"
  }
}

async function queryEvents() {
  let results = []

  try {
    results = await client.query({query: eventsQuery})
  } catch(err) {
    console.error(err)
    return []
  }

  if (results.errors && results.errors.length) {
    results.errors.map(error => console.error(error))
    return []
  }

  if (!results.data.events) {
    console.error("events key is missing!")
    return []
  }

  return results.data.events
}

async function queryMyEvents(idToken) {
  return []
}

export {
  queryEvent,
  queryEvents,
  queryMyEvents
}