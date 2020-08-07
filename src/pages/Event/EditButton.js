import React, { Fragment } from "react"
import { IconButton } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"

export default function EditButton({ canEdit, onClick }) {
  return (
    <Fragment>
      {canEdit && (
        <IconButton onClick={onClick}>
          <EditIcon />
        </IconButton>
      )}
    </Fragment>
  )
}
