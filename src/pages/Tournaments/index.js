import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { gql, useQuery } from "@apollo/client";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { compareDateStrings, fmtMonth, fmtYear, parseDate } from "../../utility/time";
import { EventListItem } from "../../common/Event";
import LoadingWidget from "../../common/LoadingWidget";
import ErrorFallback from "../../common/ErrorFallback";
import LargerTooltip from "../../common/LargerTooltip";
import DataContext from "../../context/DataContext";
import CreateEventModal from "../../common/CreateEventModal";

const ALL_EVENTS_QUERY = gql`
    query AllEvents($eventType: EventType, $startsAfter: Date, $endsBefore: Date) {
        events(eventType: $eventType, startsAfter: $startsAfter, endsBefore: $endsBefore) {
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
            }
            days {
                id
                startAt
                endAt
            }
        }
    }
`

const now = new Date()

function Tournaments() {
  const { auth } = useContext(DataContext);
  const history = useHistory()
  const [open, setOpen] = useState(false)

  if (auth && !auth.isAuthenticated()) {
    auth.silentAuth()
  }

  const startsAfter = new Date(now)
  startsAfter.setDate(startsAfter.getDate() - 15)

  const endsBefore = new Date(now)
  endsBefore.setDate(endsBefore.getDate() + 180)

  const { loading, error, data } = useQuery(ALL_EVENTS_QUERY, {
    pollInterval: 60000,
    variables: {
      eventType: "FFGOP",
      startsAfter: startsAfter.toISOString(),
      endsBefore: endsBefore.toISOString()
    }
  })

  if (loading) {
    return <LoadingWidget />
  }

  if (error) {
    return <ErrorFallback error={error} message={error.message} />
  }

  const events = data.events
    .filter(event => event.type === "FFGOP" && event.days.length > 0)
    .sort((a, b) => compareDateStrings(a.days[0].startAt, b.days[0].startAt))

  const navigateToEvent = (id) => {
    history.push(`/event/${id}`)
  }

  const handleSaved = (event) => {
    console.log(event)
    setOpen(false)
    navigateToEvent(event.id)
  }

  let curMonth = ""
  return (
    <div>
      <Container>
        <Grid container direction="column" justify="space-around">
          <Grid item>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item xs={11}>
                <Typography variant="h3" component="h1">Tournaments</Typography>
              </Grid>
              <Grid item>
                <LargerTooltip arrow title="Create a tournament">
                  <IconButton
                    color="primary"
                    aria-label="create a tournament"
                    disabled={!auth || !auth.isAuthenticated()}
                    onClick={() => setOpen(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </LargerTooltip>
                <CreateEventModal
                  auth={auth}
                  title="Create a Tournament"
                  eventType="FFGOP"
                  open={open}
                  onSaved={handleSaved}
                  onCancel={() => setOpen(false)} />
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          <Grid item>
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
                    <EventListItem event={event} onClick={() => navigateToEvent(event.id)} />
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
