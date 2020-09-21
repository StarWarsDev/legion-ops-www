import React, { Fragment, useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useMutation, useQuery } from "urql"
import { Grid, Typography } from "@material-ui/core"
import LoadingWidget from "common/LoadingWidget"
import ErrorFallback from "common/ErrorFallback"
import EventSideBar from "./EventSideBar"
import EventDescription from "./EventDescription"
import EventDays from "./EventDays"
import EditButton from "./EditButton"
import { EVENT_QUERY } from "constants/EventQueries"
import {
  CREATE_ROUND,
  PUBLISH_EVENT,
  UNPUBLISH_EVENT,
} from "constants/EventMutations"
import { useCanModifyEvent, useIsAuthenticated, useProfile } from "hooks/auth"
import CreateMatchModal from "../../common/CreateMatchModal"
import PublishButton from "./PublishButton"

export default function Event({
  match: {
    params: { id },
  },
}) {
  const history = useHistory()
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()
  const profile = useProfile()
  const [addMatchIsOpen, setAddMatchIsOpen] = useState(false)
  const [selectedRound, setSelectedRound] = useState(null)
  const [canModifyEvent] = useCanModifyEvent(id)

  // load the event data
  const [eventQueryResult, refetchEvent] = useQuery({
    query: EVENT_QUERY,
    variables: {
      id,
    },
    displayName: "getEvent",
    requestPolicy: "cache-and-network",
    pollInterval: 5000,
  })

  // mutation for adding a round
  const [createRoundResult, createRound] = useMutation(CREATE_ROUND)

  // mutation for publishing an event
  const [publishEventResult, publishEvent] = useMutation(PUBLISH_EVENT)

  // mutation for unpublishing an event
  const [unpublishEventResult, unpublishEvent] = useMutation(UNPUBLISH_EVENT)

  useEffect(() => {
    refetchEvent({ requestPolicy: "network-only" })
  }, [location, refetchEvent, id, publishEventResult, unpublishEventResult])

  useEffect(() => {
    if (createRoundResult.error) return console.error(createRoundResult.error)
    if (createRoundResult.fetching || !createRoundResult.data) return
    refetchEvent({ requestPolicy: "network-only" })
  }, [createRoundResult, refetchEvent])

  useEffect(() => {
    if (!addMatchIsOpen && !selectedRound) return
    setAddMatchIsOpen(selectedRound !== null)
  }, [addMatchIsOpen, selectedRound, setAddMatchIsOpen])

  const { fetching, data, error } = eventQueryResult

  if (fetching || !data) {
    return <LoadingWidget />
  }

  if (error) {
    const err = error
    return <ErrorFallback error={err} message={err.message} />
  }

  const { event } = data

  const handleAddDay = () => history.push(`/event/${id}/add-day`)

  const handleAddRound = ({ day }) => {
    createRound({
      eventID: id,
      dayID: day.id,
    }).catch(err => console.error(err))
  }

  const handleAddMatch = ({ round }) => {
    setSelectedRound(round)
  }

  const handleMatchCreated = ({ match }) => {
    refetchEvent()
    setSelectedRound(null)
  }

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {addMatchIsOpen && selectedRound && (
          <CreateMatchModal
            open={addMatchIsOpen}
            event={event}
            round={selectedRound}
            onCancel={() => setSelectedRound(null)}
            onMatchCreated={handleMatchCreated}
          />
        )}

        <Grid item xs={9}>
          <Typography variant="h2" component="h1">
            {event.name}
          </Typography>
        </Grid>

        {isAuthenticated && (
          <Grid item>
            {canModifyEvent && (
              <EditButton onClick={() => history.push(`/event/${id}/edit`)} />
            )}

            {canModifyEvent && (
              <PublishButton
                published={event.published}
                onPublishClick={() => publishEvent({ eventId: event.id })}
                onUnpublishClick={() => unpublishEvent({ eventId: event.id })}
              />
            )}
          </Grid>
        )}
      </Grid>

      <Grid container spacing={3} direction="row">
        <Grid item xs={9}>
          {event.description !== "" && (
            <EventDescription description={event.description} />
          )}
          <EventDays
            canModifyEvent={canModifyEvent}
            days={event.days}
            onAddDay={handleAddDay}
            onAddRound={handleAddRound}
            onAddMatch={handleAddMatch}
          />
        </Grid>

        <Grid item xs={3}>
          <EventSideBar
            event={event}
            canModifyEvent={canModifyEvent}
            isAuthenticated={isAuthenticated}
            profile={profile}
            onAddDay={() => history.push(`/event/${id}/add-day`)}
            onRegister={() => console.log("register the player")}
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}
