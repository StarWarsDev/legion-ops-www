import React from "react"
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core"
import FaceIcon from "@material-ui/icons/Face"

export default function UserListItem({ user, label }) {
  return (
    <ListItem>
      <ListItemAvatar>
        {user.picture ? <Avatar src={user.picture} /> : <FaceIcon />}
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary={label ? label : ""} />
    </ListItem>
  )
}
