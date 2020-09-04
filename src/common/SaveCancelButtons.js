import React, { Fragment } from "react"
import { IconButton } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import CancelIcon from "@material-ui/icons/Cancel"

export default function SaveCancelButtons({ onSave, onCancel }) {
  return (
    <Fragment>
      <IconButton onClick={onSave}>
        <SaveIcon />
      </IconButton>

      <IconButton onClick={onCancel}>
        <CancelIcon />
      </IconButton>
    </Fragment>
  )
}
