import React, { Fragment, useContext } from "react"
import { useQuery } from "@apollo/client"
import LoadingWidget from "../../common/LoadingWidget"
import ErrorFallback from "../../common/ErrorFallback"
import { MY_PROFILE } from "../../constants/UserQueries"
import { Divider, Grid, Typography } from "@material-ui/core"
import { compareDateStrings } from "../../utility/time"
import EventList from "../../common/Event/EventList"
import DataContext from "../../context/DataContext"
import { useHistory } from "react-router-dom"

function eventNameSort(a, b) {
  return a.name > b.name
}

function eventDaySort(a, b) {
  const aStart = a.days[0].startAt
  const bStart = b.days[0].startAt
  return aStart !== bStart
    ? compareDateStrings(aStart, bStart)
    : eventNameSort(a, b)
}

export default function MyEvents() {
  const { auth } = useContext(DataContext)
  const history = useHistory()

  if (auth && !auth.isAuthenticated()) {
    auth.silentAuth()
  }

  const { loading, data, error } = useQuery(MY_PROFILE)

  // show the loading screen
  if (loading) {
    return <LoadingWidget />
  }

  // handle errors getting event
  if (error) {
    return <ErrorFallback error={error} message={error.message} />
  }

  const navigateToEvent = id => {
    history.push(`/event/${id}`)
  }

  const organizedUnscheduledEvents = data.myProfile.organizedEvents
    .filter(event => event.days.length === 0)
    .sort(eventNameSort)

  const organizedEventsWithDays = data.myProfile.organizedEvents
    .filter(event => event.days.length > 0)
    .sort(eventDaySort)

  const judgingEvents = data.myProfile.judgingEvents
    .filter(event => event.days.length > 0)
    .sort(eventDaySort)

  const playingEvents = data.myProfile.participatingEvents
    .filter(event => event.days.length > 0)
    .sort(eventDaySort)

  const totalNumEvents =
    organizedUnscheduledEvents.length +
    organizedEventsWithDays.length +
    judgingEvents.length +
    playingEvents.length

  return (
    <Grid container direction="column" justify="space-around">
      <Grid item xs={12}>
        <Typography variant="h3" component="h1">
          My Events ({totalNumEvents})
        </Typography>
        <Divider />
      </Grid>

      {totalNumEvents === 0 && (
        <Fragment>
          <Typography variant="body1">You have no events</Typography>
        </Fragment>
      )}

      {organizedUnscheduledEvents.length > 0 && (
        <Fragment>
          <Grid item xs={12}>
            <EventList
              unscheduled
              title="Organizer - Unscheduled"
              events={organizedUnscheduledEvents}
              onItemClick={event => navigateToEvent(event.id)}
            />
          </Grid>
        </Fragment>
      )}

      {organizedEventsWithDays.length > 0 && (
        <Fragment>
          <Divider />

          <Grid item xs={12}>
            <EventList
              title="Organizer - Scheduled"
              events={organizedEventsWithDays}
              onItemClick={event => navigateToEvent(event.id)}
            />
          </Grid>
        </Fragment>
      )}

      {judgingEvents.length > 0 && (
        <Fragment>
          <Divider />

          <Grid item xs={12}>
            <EventList
              title="Judging"
              events={judgingEvents}
              onItemClick={event => navigateToEvent(event.id)}
            />
          </Grid>
        </Fragment>
      )}

      {playingEvents.length > 0 && (
        <Fragment>
          <Divider />

          <Grid item xs={12}>
            <EventList
              title="Playing"
              events={playingEvents}
              onItemClick={event => navigateToEvent(event.id)}
            />
          </Grid>
        </Fragment>
      )}
    </Grid>
  )
}
