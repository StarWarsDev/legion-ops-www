import React from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { CAN_MODIFY_QUERY } from "../EditButton"
import { EVENT_QUERY } from "../index"
import LoadingWidget from "../../../common/LoadingWidget"
import ErrorFallback from "../../../common/ErrorFallback"

export default function EditEvent({
  match: {
    params: { id },
  },
}) {
  const history = useHistory()
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
    return <ErrorFallback error={error} message={error.message} />
  }

  return (
    <div>
      Edit event {id}
      <br />
      <pre>{JSON.stringify(eventData, undefined, 2)}</pre>
    </div>
  )
}
