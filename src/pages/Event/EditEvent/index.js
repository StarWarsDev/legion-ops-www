import React, { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import {
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import CancelIcon from "@material-ui/icons/Cancel"
import ReactMarkdown from "react-markdown"
import { CAN_MODIFY_QUERY } from "../EditButton"
import LoadingWidget from "../../../common/LoadingWidget"
import ErrorFallback from "../../../common/ErrorFallback"
import { MarkdownRenderer } from "../../../common/renderer"
import { EVENT_QUERY, UPDATE_EVENT } from "../../../constants/EventQueries"

export default function EditEvent({
  match: {
    params: { id },
  },
}) {
  const history = useHistory()

  const [updateEvent] = useMutation(UPDATE_EVENT)

  const { loading, data, error } = useQuery(CAN_MODIFY_QUERY, {
    variables: {
      id: id,
    },
  })

  const {
    loading: eventLoading,
    data: eventData,
    error: eventError,
  } = useQuery(EVENT_QUERY, {
    variables: {
      id: id,
    },
  })

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (eventData && eventData.event) {
      if (eventData.event.name) {
        setName(eventData.event.name)
      }

      if (eventData.event.description) {
        setDescription(eventData.event.description)
      }
    }
  }, [eventData])

  // handle errors getting permissions
  if (error) {
    return <ErrorFallback error={error} message={error.message} />
  }

  // if user is not authorized to edit, then send them back to the event page
  if (!loading && data && !data.canModifyEvent) {
    history.push(`/event/${id}`)
  }

  // show the loading screen
  if (eventLoading) {
    return <LoadingWidget />
  }

  // handle errors getting event
  if (eventError) {
    return <ErrorFallback error={eventError} message={eventError.message} />
  }

  const { event } = eventData

  const handleSaveClick = () => {
    const eventInput = {
      id,
      name,
      description,
      type: event.type,
    }

    updateEvent({
      variables: {
        input: eventInput,
      },
    })
      .then(({ data: { updateEvent } }) =>
        history.push(`/event/${updateEvent.id}`)
      )
      .catch(err => console.error(err))
  }

  return (
    <Fragment>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Typography variant="h2" component="h2">
            Edit Event
          </Typography>
        </Grid>

        <Grid item>
          <Paper>
            <Container>
              <Grid
                container
                direction="column"
                spacing={5}
                justify="space-between"
              >
                <form noValidate autoComplete="off">
                  <Grid item xs={12}>
                    <Grid container direction="row" spacing={3}>
                      <Grid item xs={9}>
                        <TextField
                          id="t-name"
                          label="Tournament Name"
                          value={name}
                          onChange={({ target: { value } }) => setName(value)}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          id="o-name"
                          label="Organizer"
                          fullWidth
                          value={event.organizer.name}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container direction="row" spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          multiline
                          id="e-description"
                          label="Description"
                          fullWidth
                          rows={10}
                          value={description}
                          onChange={({ target: { value } }) =>
                            setDescription(value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary" variant="caption">
                          Preview
                        </Typography>
                        <ReactMarkdown
                          source={description}
                          renderers={MarkdownRenderer}
                        />
                      </Grid>
                    </Grid>
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
                        <IconButton onClick={handleSaveClick}>
                          <SaveIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => history.push(`/event/${id}`)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}
