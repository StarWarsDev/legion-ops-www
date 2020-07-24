import React, { useState } from "react"

import { Container, Typography } from "@material-ui/core"
import Matches from "./Matches"

export default function EventDayRounds({ rounds }) {
  const [sortedRounds] = useState(
    [...rounds].sort((a, b) => a.counter - b.counter)
  )

  return (
    <>
      {sortedRounds.map((round, i) => (
        <Container key={round.id}>
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
        </Container>
      ))}
    </>
  )
}
