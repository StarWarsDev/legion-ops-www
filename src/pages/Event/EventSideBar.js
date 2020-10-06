import React, { Fragment, useEffect, useState } from "react"
import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core"
import Icon from "@mdi/react"
import { mdiTournament } from "@mdi/js"
import { fmtEventType } from "utility/strings"
import UserList from "common/User/UserList"
import UserListItem from "common/User/UserListItem"
import { sortByName } from "utility/sort"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"
import AssignmentIcon from '@material-ui/icons/Assignment';
import { RegistrationTypes } from "constants/event"

const useStyles = makeStyles(theme => ({
  rightPanel: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: ".5rem",
  },
}))

export default function EventSideBar({
  event,
  onAddDay,
  onRegister,
  onLeave,
  onRegistrationChange,
  canModifyEvent,
  isAuthenticated,
  profile,
}) {
  const classes = useStyles()
  const [registration, setRegistration] = useState(event.registration)
  
  useEffect(() => {
    if (event.registration !== registration) {
      onRegistrationChange(registration)
    }
  }, [event, registration, onRegistrationChange])

  const handleRegistrationChange = ({ target: { value }}) => {
    setRegistration(value)
  }

  let profileInPlayers =
    event.players.filter(player => player.username === profile.username)
      .length > 0
  
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
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Registration" secondary={canModifyEvent ? "" : event.registration} />
            {canModifyEvent && (
              <Select value={event.registration} onChange={e => handleRegistrationChange(e)}>
                {Object.keys(RegistrationTypes).map(key => (
                  <MenuItem key={key} value={key}>{RegistrationTypes[key]}</MenuItem>
                ))}
              </Select>
            )}
          </ListItem>
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
        <UserList
          label="Players"
          showRegisterButton={
            event.registration === "OPEN" &&
            isAuthenticated &&
            profile &&
            !profileInPlayers
          }
          showLeaveButton={isAuthenticated && profile && profileInPlayers}
          onRegisterClick={onRegister}
          onLeaveClick={onLeave}
        >
          {[...event.players].sort(sortByName).map(player => (
            <UserListItem key={player.id} user={player} />
          ))}
        </UserList>
      </div>
    </Fragment>
  )
}
