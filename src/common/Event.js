import React from "react"
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core"
import { fmtDay, parseDate } from "../utility/time";
import { fmtEventType } from "../utility/strings";


export function EventListItem({ event, onClick }) {
  const startDate = parseDate(event.days[0].startAt)
  let secondaryLines = []
  secondaryLines.push(
    `${event.days.length} day${event.days.length > 1 ? "s" : ""}`
  )
  secondaryLines.push(fmtEventType(event.type))
  secondaryLines.push(`Organizer: ${event.organizer.name}`)
  secondaryLines.push(`${event.players.length} registered players`)
  return (
    <ListItem alignItems="flex-start" button onClick={onClick}>
      <ListItemAvatar>
        <Avatar>{fmtDay(startDate)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={event.name}
        secondary={secondaryLines.join(" - ")}
      />
    </ListItem>
  )
}