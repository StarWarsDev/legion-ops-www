import React, { useState } from "react"

import { Container, Grid, Typography } from "@material-ui/core"
import Matches from "./Matches"
import Button from "@material-ui/core/Button"

export default function EventDayRounds({ rounds, canModifyEvent, onAddRound }) {
  const [sortedRounds] = useState(
    [...rounds].sort((a, b) => a.counter - b.counter)
  )

  return (
    <Grid container direction="column" spacing={5}>
      {canModifyEvent && (
        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Button size="small" onClick={onAddRound}>
              Add Round
            </Button>
          </Grid>
        </Grid>
      )}

      {sortedRounds.map((round, i) => (
        <Grid item key={round.id}>
          <Typography
            variant="h6"
            component="h3"
            style={{ marginBottom: "0.5rem" }}
          >
            Round {i + 1}
          </Typography>

          <Container>
            <Matches matches={round.matches} />
          </Container>
        </Grid>
      ))}
    </Grid>
  )
}
