import React, { useState, useEffect } from "react"
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@material-ui/core"
import { useMutation } from "urql"
import { CREATE_MATCH } from "../constants/EventMutations"
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles"
import SaveCancelButtons from "./SaveCancelButtons"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function playerValidForSelection(round, player, player1Id, player2Id) {
  let isValid = player.id !== player1Id && player.id !== player2Id

  if (isValid) {
    round.matches.forEach(({ player1, player2 }) => {
      if (isValid && (player1.id === player.id || player2.id === player.id)) {
        isValid = false
      }
    })
  }

  return isValid
}

export default function CreateMatchModal({
  open,
  event,
  round,
  onCancel,
  onMatchCreated,
}) {
  const classes = useStyles()
  // mutation for adding a match
  const [createMatchResult, createMatch] = useMutation(CREATE_MATCH)
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const [selectionIsValid, setSelectionIsValid] = useState(false)

  useEffect(() => {
    if (createMatchResult.fetching) return
    if (createMatchResult.error) return console.error(createMatchResult.error)
    if (!createMatchResult.data) return

    // call the onMatchCreated callback and pass in the match
    onMatchCreated({ match: createMatchResult.data })
  }, [createMatchResult, onMatchCreated])

  useEffect(() => {
    let isValid = false

    if (player1 !== "" && player2 !== "" && player1 !== player2) {
      isValid = true
    }

    // TODO: ensure that each player has not already been assigned to another match

    if (isValid !== selectionIsValid) {
      setSelectionIsValid(isValid)
    }
  }, [player1, player2, selectionIsValid])

  const handlePlayerChange = setter => ({ target: { value } }) => {
    setter(value)
  }

  const handleSave = () => {
    // handle bad state
    if (player1 === player2)
      return console.error("Players 1 and 2 cannot be the same person...")
    if (player1 === "" || player2 === "")
      return console.error("Player IDs cannot be blank")

    // create the match
    createMatch({
      eventID: event.id,
      roundID: round.id,
      input: {
        player1,
        player2,
      },
    })
  }

  let day = null
  event.days.forEach(eDay => {
    eDay.rounds.forEach(dRound => {
      if (dRound.id === round.id) {
        day = eDay
      }
    })
  })

  return (
    <Modal open={open} onEscapeKeyDown={onCancel}>
      <Container>
        <Paper>
          <Typography variant="h2">Create match</Typography>
          <Typography variant="h4">
            Round {round.counter} on {moment(day.startAt).toLocaleString()}
          </Typography>

          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel>Player 1</InputLabel>
              <Select value={player1} onChange={handlePlayerChange(setPlayer1)}>
                {event.players.map(player => (
                  <MenuItem
                    key={`player1-${player.id}`}
                    value={player.id}
                    disabled={
                      !playerValidForSelection(round, player, player1, player2)
                    }
                  >
                    {player.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Player 2</InputLabel>
              <Select value={player2} onChange={handlePlayerChange(setPlayer2)}>
                {event.players.map(player => (
                  <MenuItem
                    key={`player2-${player.id}`}
                    value={player.id}
                    disabled={
                      !playerValidForSelection(round, player, player1, player2)
                    }
                  >
                    {player.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <SaveCancelButtons
            onSave={handleSave}
            onCancel={onCancel}
            saveDisabled={!selectionIsValid}
          />
        </Paper>
      </Container>
    </Modal>
  )
}
