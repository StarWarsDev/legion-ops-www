import React from "react"
import { gql, useQuery } from "@apollo/client"
import { Container, Grid, Typography } from "@material-ui/core"
import LoadingWidget from "../../common/LoadingWidget"
import ErrorFallback from "../../common/ErrorFallback"
import EventSideBar from "./EventSideBar"
import EventDescription from "./EventDescription"
import EventDays from "./EventDays"

const EVENT_QUERY = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
      type
      organizer {
        id
        name
        picture
      }
      headJudge {
        id
        name
        picture
      }
      judges {
        id
        name
        picture
      }
      players {
        id
        name
        picture
      }
      days {
        id
        createdAt
        updatedAt
        startAt
        endAt
        rounds {
          id
          counter
          matches {
            id
            player1 {
              id
              name
              picture
            }
            player1VictoryPoints
            player1MarginOfVictory
            player2 {
              id
              name
              picture
            }
            player2VictoryPoints
            player2MarginOfVictory
            bye {
              id
              name
              picture
            }
            blue {
              id
              name
              picture
            }
            winner {
              id
              name
              picture
            }
          }
        }
      }
    }
  }
`

export default function Event({ match: { params } }) {
  const { loading, data, error } = useQuery(EVENT_QUERY, {
    variables: {
      id: params.id,
    },
  })

  if (loading) {
    return <LoadingWidget />
  }

  if (error) {
    return <ErrorFallback error={error} message={error.message} />
  }

  const { event } = data

  return (
    <Container>
      <Typography variant="h2" component="h1">
        {event.name}
      </Typography>

      <Grid container spacing={3} direction="row">
        <Grid item xs={9}>
          {event.description !== "" && (
            <EventDescription description={event.description} />
          )}
          <EventDays days={event.days} />
        </Grid>

        <Grid item xs={3}>
          <EventSideBar event={event} />
        </Grid>
      </Grid>
    </Container>
  )
}
