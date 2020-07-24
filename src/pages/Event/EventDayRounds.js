import React, { useState } from "react";

import {
  Container
} from "@material-ui/core"
import Matches from "./Matches";

export default function EventDayRounds({ rounds }) {
  const [sortedRounds] = useState([...rounds].sort((a, b) => a.counter - b.counter))

  return (
    <>
      {sortedRounds.map(round => (
        <Container key={round.id}>
          <Matches matches={round.matches} />
        </Container>
      ))}
    </>
  )
}