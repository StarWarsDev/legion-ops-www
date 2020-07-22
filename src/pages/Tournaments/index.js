import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core"
import { compareDateStrings, fmtMonth, fmtYear, parseDate } from "../../utility/time";
import { EventListItem } from "../../common/Event";
import LoadingWidget from "../../common/LoadingWidget";

const ALL_EVENTS_QUERY = gql`
    query AllEvents {
        events {
            id
            createdAt
            updatedAt
            name
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
            }
            days {
                id
                startAt
                endAt
            }
        }
    }
`

function Tournaments() {
  const { loading, error, data } = useQuery(ALL_EVENTS_QUERY, {
    pollInterval: 5000,
  })

  if (loading) {
    return <LoadingWidget />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const events = data.events
    .filter(event => event.type === "FFGOP" && event.days.length > 0)
    .sort((a, b) => compareDateStrings(a.days[0].startAt, b.days[0].startAt))

  let curMonth = ""
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" component="h3">Tournaments</Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <List>
              {events.map(event => {
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
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Tournaments
