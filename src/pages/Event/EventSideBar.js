import React from "react"
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core"
import Icon from "@mdi/react"
import { mdiTournament } from "@mdi/js"
import { fmtEventType } from "../../utility/strings"
import UserList from "../../common/User/UserList"
import UserListItem from "../../common/User/UserListItem"
import { sortByName } from "../../utility/sort"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  rightPanel: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function EventSideBar({ event }) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.rightPanel}>
        <Container>
          <Typography variant="caption" color="textSecondary">
            Event Style
          </Typography>
        </Container>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Icon path={mdiTournament} size={1} />
            </ListItemAvatar>
            <ListItemText primary={fmtEventType(event.type)} />
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
        <UserList label={`Players - ${event.players.length}`}>
          {[...event.players].sort(sortByName).map(player => (
            <UserListItem key={player.id} user={player} />
          ))}
        </UserList>
      </div>
    </>
  )
}
