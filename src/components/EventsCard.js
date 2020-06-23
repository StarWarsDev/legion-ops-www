import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import EventListItem from "./EventListItem"
import {
  compareDateStrings,
  fmtMonth,
  fmtYear,
  parseDate,
} from "../utils/datetime"

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    events {
      id
      createdAt
      updatedAt
      name
      type
      organizer {
        id
        name
        username
        picture
      }
      headJudge {
        id
        name
        username
        picture
      }
      judges {
        id
        name
        username
        picture
      }
      players {
        id
        name
        username
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
              username
              picture
            }
            player1VictoryPoints
            player1MarginOfVictory
            player2 {
              id
              name
              picture
              username
              picture
            }
            player2VictoryPoints
            player2MarginOfVictory
            bye {
              id
              name
              picture
              username
              picture
            }
            blue {
              id
              name
              picture
              username
              picture
            }
            winner {
              id
              name
              picture
              username
              picture
            }
          }
        }
      }
    }
  }
`

export default function EventsCard() {
  const { loading, error, data } = useQuery(APOLLO_QUERY)
  console.log(loading, error, data)
  let curMonth = ""
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Events</Typography>
        {loading && !error ? (
          <CircularProgress />
        ) : (
          <List>
            {data.events.sort(compareDateStrings).map(event => {
              const startDate = parseDate(event.days[0].startAt)
              const month = fmtMonth(startDate)
              const year = fmtYear(startDate)
              const fmtMonthYear = `${month} - ${year}`
              let printMonth = false
              if (fmtMonthYear !== curMonth) {
                curMonth = fmtMonthYear
                printMonth = true
              }
              return (
                <React.Fragment key={event.id}>
                  {printMonth && (
                    <ListItem>
                      <ListItemText primary={fmtMonthYear} />
                    </ListItem>
                  )}
                  <EventListItem event={event} />
                </React.Fragment>
              )
            })}
          </List>
        )}
      </CardContent>
    </Card>
  )
}
