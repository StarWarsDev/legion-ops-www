import React, { Fragment } from "react"
import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core"
import Icon from "@mdi/react"
import { mdiTournament } from "@mdi/js"
import { fmtEventType } from "../../utility/strings"
import UserList from "../../common/User/UserList"
import UserListItem from "../../common/User/UserListItem"
import { sortByName } from "../../utility/sort"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles(theme => ({
  rightPanel: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: ".5rem",
  },
}))

export default function EventSideBar({ event, onAddDay, canModifyEvent }) {
  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.rightPanel}>
        <Container>
          <Typography variant="caption" color="textSecondary">
            Event Style
          </Typography>
        </Container>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Icon path={mdiTournament} size={1} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={fmtEventType(event.type)} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>{event.days.length}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Day${event.days.length === 1 ? "" : "s"}`}
            />
            {canModifyEvent && (
              <Tooltip title="Add a day">
                <IconButton onClick={onAddDay}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>{event.players.length}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Player${event.players.length === 1 ? "" : "s"}`}
            />
          </ListItem>
        </List>
      </div>

      <Divider />

      <div className={classes.rightPanel}>
        <UserList label="Staff">
          <UserListItem user={event.organizer} label="Organizer" />

          {event.headJudge && (
            <UserListItem user={event.headJudge} label="Head Judge" />
          )}

          {[...event.judges].sort(sortByName).map(judge => (
            <UserListItem key={judge.id} user={judge} label="Judge" />
          ))}
        </UserList>
      </div>

      <Divider />

      <div className={classes.rightPanel}>
        <UserList label="Players">
          {[...event.players].sort(sortByName).map(player => (
            <UserListItem key={player.id} user={player} />
          ))}
        </UserList>
      </div>
    </Fragment>
  )
}
