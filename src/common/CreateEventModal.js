import React, { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import {
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: "100%",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function CreateEventModal({ auth, title, open, onClose }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(startDate.getHours() + 8)));

  const organizerName = auth && auth.isAuthenticated() && auth.getProfile() ? auth.getProfile().name : "";

  return (

    <Modal open={open} className={classes.modal} onClose={onClose}>
      <Container>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">{title}</Typography>
              <Divider/>
            </Grid>

            <form noValidate autoComplete="off">
              <Grid item xs={12}>
                <Grid container direction="row" spacing={3}>
                  <Grid item xs={2}>
                    <TextField id="o-name" label="Organizer" fullWidth value={organizerName} disabled/>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField id="t-name" label="Tournament Name" fullWidth/>
                  </Grid>

                  <Grid item xs={3}>
                    <KeyboardDateTimePicker
                      format="yyyy-MM-dd h:mm a"
                      fullWidth
                      id="start-date-picker"
                      label="Start Date / Time"
                      value={startDate}
                      onChange={date => setStartDate(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change start date"
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <KeyboardDateTimePicker
                      format="yyyy-MM-dd h:mm a"
                      fullWidth
                      id="end-date-picker"
                      label="End Date / Time"
                      value={endDate}
                      onChange={date => setEndDate(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change end date"
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField multiline id="e-description" label="Description" fullWidth rows={10} />
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Container>
    </Modal>
  );
}