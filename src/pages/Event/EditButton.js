import React, { Fragment } from "react"
import { IconButton } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import { gql, useQuery } from "@apollo/client"

export const CAN_MODIFY_QUERY = gql`
  query CanModifyEvent($id: ID!) {
    canModifyEvent(id: $id)
  }
`

export default function EditButton({ eventId, onClick }) {
  const { loading, data, error } = useQuery(CAN_MODIFY_QUERY, {
    variables: {
      id: eventId,
    },
  })

  if (error) console.error(error)

  return (
    <Fragment>
      {!loading && !error && data.canModifyEvent && (
        <IconButton onClick={onClick}>
          <EditIcon />
        </IconButton>
      )}
    </Fragment>
  )
}
