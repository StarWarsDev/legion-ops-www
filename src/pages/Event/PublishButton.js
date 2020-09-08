import React, { Fragment } from "react"
import { IconButton, Tooltip } from "@material-ui/core"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

export default function PublishButton({
  canModifyEvent,
  published,
  onPublishClick,
  onUnpublishClick,
}) {
  const tooltipText = `Event is ${published ? "P" : "Unp"}ublished. Click to ${
    published ? "un" : ""
  }publish`

  return (
    <Fragment>
      {canModifyEvent && (
        <Tooltip title={tooltipText}>
          <IconButton onClick={published ? onUnpublishClick : onPublishClick}>
            {published ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Tooltip>
      )}
    </Fragment>
  )
}
