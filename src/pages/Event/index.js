import React, { Fragment, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Grid, Typography } from "@material-ui/core"
import LoadingWidget from "../../common/LoadingWidget"
import ErrorFallback from "../../common/ErrorFallback"
import EventSideBar from "./EventSideBar"
import EventDescription from "./EventDescription"
import EventDays from "./EventDays"
import EditButton from "./EditButton"
import { CAN_MODIFY_QUERY, EVENT_QUERY } from "../../constants/EventQueries"

export default function Event({
  match: {
    params: { id },
  },
}) {
  const history = useHistory()

  // get event edit permissions
  const {
    loading: canModifyLoading,
    data: canModifyData,
    error: canModifyError,
  } = useQuery(CAN_MODIFY_QUERY, {
    variables: {
      id,
    },
  })

  // load the event data
  const { loading, data, error, refetch } = useQuery(EVENT_QUERY, {
    variables: {
      id,
    },
    pollInterval: 15000,
  })

  useEffect(() => {
    if (!loading && history.location.pathname === `/event/${id}`) {
      refetch()
    }
  }, [id, loading, refetch, history])

  if (loading) {
    return <LoadingWidget />
  }

  if (canModifyError || error) {
    const err = canModifyError || error
    return <ErrorFallback error={err} message={err.message} />
  }

  const { event } = data
  const canModifyEvent =
    !canModifyLoading && canModifyData && canModifyData.canModifyEvent

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={11}>
          <Typography variant="h2" component="h1">
            {event.name}
          </Typography>
        </Grid>

        <Grid item>
          <EditButton
            canEdit={canModifyEvent}
            onClick={() => history.push(`/event/${id}/edit`)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} direction="row">
        <Grid item xs={9}>
          {event.description !== "" && (
            <EventDescription description={event.description} />
          )}
          <EventDays
            canModifyEvent={canModifyEvent}
            days={event.days}
            onAddDay={() => history.push(`/event/${id}/add-day`)}
          />
        </Grid>

        <Grid item xs={3}>
          <EventSideBar
            event={event}
            canModifyEvent={canModifyEvent}
            onAddDay={() => history.push(`/event/${id}/add-day`)}
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}
