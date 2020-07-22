import React, { useContext } from "react";
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core"
import DataContext from "../../context/DataContext";
import { compareDateStrings, fmtMonth, fmtYear, parseDate } from "../../utility/time";
import { EventListItem } from "../../common/Event";

function Tournaments() {
  const { events } = useContext(DataContext)
  let curMonth = ""
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" component="h3">Tournaments</Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <List>
              {events.tournament.sort(compareDateStrings).map(event => {
                const startDate = parseDate(event.days[0].startAt)
                const month = fmtMonth(startDate)
                const year = fmtYear(startDate)
                const fmtMonthYear = `${month} - ${year}`
                let printMonth = false
                if (fmtMonthYear !== curMonth) {
                  curMonth = fmtMonthYear
                  printMonth = true
                }
                return (
                  <React.Fragment key={event.id}>
                    {printMonth && (
                      <ListItem>
                        <ListItemText primary={fmtMonthYear} />
                      </ListItem>
                    )}
                    <EventListItem event={event} />
                  </React.Fragment>
                )
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Tournaments
