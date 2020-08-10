import React from "react"
import { Container, List, Typography } from "@material-ui/core"

export default function UserList({ children, label }) {
  return (
    <>
      <Container>
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
      </Container>
      <List dense>{children}</List>
    </>
  )
}
