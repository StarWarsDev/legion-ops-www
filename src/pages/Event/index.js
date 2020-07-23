import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionSummary,
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FaceIcon from "@material-ui/icons/Face";
import Icon from "@mdi/react";
import { mdiTournament } from "@mdi/js";
import ReactMarkdown from "react-markdown";
import LoadingWidget from "../../common/LoadingWidget";
import ErrorFallback from "../../common/ErrorFallback";
import { fmtEventType } from "../../utility/strings";
import { parseDate } from "../../utility/time";

const EVENT_QUERY = gql`
    query Event($id: ID!) {
        event(id: $id) {
            id
            createdAt
            updatedAt
            name
            description
            type
            organizer {
                id
                name
                picture
            }
            headJudge {
                id
                name
                picture
            }
            judges {
                id
                name
                picture
            }
            players {
                id
                name
                picture
            }
            days {
                id
                createdAt
                updatedAt
                startAt
                endAt
                rounds {
                    id
                    counter
                    matches {
                        id
                        player1 {
                            id
                            name
                            picture
                        }
                        player1VictoryPoints
                        player1MarginOfVictory
                        player2 {
                            id
                            name
                            picture
                        }
                        player2VictoryPoints
                        player2MarginOfVictory
                        bye {
                            id
                            name
                            picture
                        }
                        blue {
                            id
                            name
                            picture
                        }
                        winner {
                            id
                            name
                            picture
                        }
                    }
                }
            }
        }
    }
`;

const useStyles = makeStyles((theme) => ({
  hero: {
    paddingTop: theme.typography.pxToRem(7),
    paddingBottom: theme.typography.pxToRem(7),
    paddingRight: theme.typography.pxToRem(15),
    paddingLeft: theme.typography.pxToRem(15),
    marginBottom: "1rem",
    backgroundColor: theme.palette.background.paper
  },
  rightPanel: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
}));

export default function Event({ match: { params } }) {
  const classes = useStyles();
  const { loading, data, error } = useQuery(EVENT_QUERY, {
    variables: {
      id: params.id
    }
  });

  if (loading) {
    return <LoadingWidget/>;
  }

  if (error) {
    return <ErrorFallback error={error} message={error.message}/>;
  }

  const { event } = data;

  return (
    <Container>
      <Typography variant="h2" component="h1">{event.name}</Typography>

      <Grid container spacing={3} direction="row">
        <Grid item xs={9}>
          <div className={classes.hero}>
            <ReactMarkdown source={event.description} />
          </div>

          {event.days.length && (
            <Accordion>
              {event.days.map((day, i) => {
                const startDate = new Date(parseDate(day.startAt)).toLocaleDateString()
                const startTime = new Date(parseDate(day.startAt)).toLocaleTimeString()
                const startDateTime = `${startDate} @ ${startTime}`

                const endDate = new Date(parseDate(day.endAt)).toLocaleDateString()
                const endTime = new Date(parseDate(day.endAt)).toLocaleTimeString()
                const endDateTime = `${endDate} @ ${endTime}`

                return (
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} key={day.id}>
                    <Typography className={classes.heading}>Day {i+1}: {startDateTime} - {endDateTime}</Typography>
                  </AccordionSummary>
                )
              })}
            </Accordion>
          )}
        </Grid>
        <Grid item xs={3}>
          <div className={classes.rightPanel}>
            <Container>
              <Typography variant="caption" color="textSecondary">Event Style</Typography>
            </Container>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Icon path={mdiTournament} size={1}/>
                </ListItemAvatar>
                <ListItemText primary={fmtEventType(event.type)}/>
              </ListItem>
            </List>
          </div>

          <Divider/>
          <div className={classes.rightPanel}>
            <Container>
              <Typography variant="caption" color="textSecondary">Staff</Typography>
            </Container>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  {event.organizer.picture ? (
                    <Avatar src={event.organizer.picture}/>
                  ) : (
                    <FaceIcon/>
                  )}
                </ListItemAvatar>
                <ListItemText primary={event.organizer.name} secondary="Organizer"/>
              </ListItem>

              {event.headJudge && (
                <ListItem>
                  <ListItemAvatar>
                    {event.headJudge.picture ? (
                      <Avatar src={event.headJudge.picture}/>
                    ) : (
                      <FaceIcon/>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={event.headJudge.name} secondary="Head Judge"/>
                </ListItem>
              )}

              {[...event.judges].sort((a, b) => (a.name > b.name) ? 1 : -1).map(judge => (
                <ListItem key={judge.id}>
                  <ListItemAvatar>
                    {judge.picture ? (
                      <Avatar src={judge.picture}/>
                    ) : (
                      <FaceIcon/>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={judge.name} secondary="Judge"/>
                </ListItem>
              ))}
            </List>
          </div>

          <Divider/>

          <div className={classes.rightPanel}>
            <Container>
              <Typography variant="caption" color="textSecondary">Players - {event.players.length}</Typography>
            </Container>

            <List dense>
              {[...event.players].sort((a, b) => (a.name > b.name) ? 1 : -1).map(player => (
                <ListItem key={player.id}>
                  <ListItemAvatar>
                    {player.picture ? (
                      <Avatar src={player.picture}/>
                    ) : (
                      <FaceIcon/>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={player.name}/>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>

    </Container>
  );
}