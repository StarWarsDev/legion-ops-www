import React, { Fragment, useState } from "react"
import { useHistory } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import DateFnsUtils from "@date-io/date-fns"
import { EVENT_QUERY } from "constants/EventQueries"
import LoadingWidget from "common/LoadingWidget"
import ErrorFallback from "common/ErrorFallback"
import { IconButton, Grid, Paper, Typography } from "@material-ui/core"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers"
import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from "@material-ui/icons/Save"
import CancelIcon from "@material-ui/icons/Cancel"
import moment from "moment"
import { CREATE_DAY } from "../../../../constants/EventMutations"

const useStyles = makeStyles(() => ({
  paper: {
    padding: "1rem",
  },
}))

export default function AddDay({
  match: {
    params: { id },
  },
}) {
  const history = useHistory()
  const classes = useStyles()

  // state
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const [createDay] = useMutation(CREATE_DAY)

  // load the event data but get it from the cache first to reduce loading times
  const { loading, data, error } = useQuery(EVENT_QUERY, {
    variables: {
      id,
    },
    fetchPolicy: "cache-first",
  })

  if (loading) {
    return <LoadingWidget />
  }

  if (error) {
    return <ErrorFallback error={error} message={error.message} />
  }

  const handleDayChange = date => {
    // TODO: do some checks to preserve the end time
    setStart(date)
    setEnd(date)
  }
  const handleStartChange = date => setStart(date)
  const handleEndChange = date => setEnd(date)

  const handleSave = () => {
    // TODO: do some validations to ensure that the same day is being used
    // format the dates
    const startStr = moment(start).format()
    const endStr = moment(end).format()
    // call GraphQL mutation createDay
    createDay({
      variables: {
        eventID: id,
        input: {
          startAt: startStr,
          endAt: endStr,
        },
      },
    })
      .then(() => history.push(`/event/${id}`))
      .catch(err => console.error(err))
  }

  const {
    event: { name },
  } = data

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1">
            <em>{name}</em> - Add a Day
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container justify="space-between">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* TODO: select day */}
                <KeyboardDatePicker
                  label="Date"
                  value={start}
                  onChange={handleDayChange}
                />

                {/* TODO: select start time */}
                <KeyboardTimePicker
                  label="Start"
                  value={start}
                  onChange={handleStartChange}
                />

                {/* TODO: select end time */}
                <KeyboardTimePicker
                  label="End"
                  value={end}
                  onChange={handleEndChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            spacing={3}
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <IconButton onClick={handleSave}>
                <SaveIcon />
              </IconButton>

              <IconButton onClick={() => history.push(`/event/${id}`)}>
                <CancelIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}
