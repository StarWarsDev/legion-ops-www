import React, { Fragment } from "react"
import { Button, Grid, List, Typography } from "@material-ui/core"

export default function UserList({
  children,
  label,
  showRegisterButton,
  onRegisterClick,
}) {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="caption" color="textSecondary">
            {label}
          </Typography>
        </Grid>

        {showRegisterButton && (
          <Grid item>
            <Button size="small" onClick={onRegisterClick}>
              Sign Up
            </Button>
          </Grid>
        )}
      </Grid>
      <List dense>{children}</List>
    </Fragment>
  )
}
