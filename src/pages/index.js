import React from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ActivityCard from "../components/ActivityCard"
import EventsCard from "../components/EventsCard"

const Welcome = () => (
  <Card>
    <CardContent>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome!
      </Typography>

      <Typography variant="subtitle1" component="p">
        Legion Ops makes organizing and running events for Star Wars Legion
        easier than ever before!
      </Typography>
    </CardContent>
    <CardActions>
      <Button color="primary" variant="contained">
        Get Started!
      </Button>
    </CardActions>
  </Card>
)

export default () => {
  return (
    <Layout>
      <SEO title="Legion Ops - Home" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Welcome />
            </Grid>

            <Grid item xs={12}>
              <EventsCard />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <ActivityCard />
        </Grid>
      </Grid>
    </Layout>
  )
}
