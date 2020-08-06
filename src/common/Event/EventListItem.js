import React from "react"
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core"
import { fmtDay, parseDate } from "../../utility/time"
import { fmtEventType } from "../../utility/strings"

export function EventListItem({ event, onClick }) {
  let startDate = new Date()
  let secondaryLines = []
  if (event.days.length > 0) {
    startDate = parseDate(event.days[0].startAt)
  }
  secondaryLines.push(
    `${event.days.length} day${event.days.length === 1 ? "" : "s"}`
  )
  secondaryLines.push(fmtEventType(event.type))
  secondaryLines.push(`Organizer: ${event.organizer.name}`)
  secondaryLines.push(`${event.players.length} registered players`)
  return (
    <ListItem alignItems="flex-start" button onClick={onClick}>
      <ListItemAvatar>
        {event.days.length > 0 && <Avatar>{fmtDay(startDate)}</Avatar>}
        {event.days.length === 0 && <Avatar>?</Avatar>}
      </ListItemAvatar>
      <ListItemText
        primary={event.name}
        secondary={secondaryLines.join(" - ")}
      />
    </ListItem>
  )
}
