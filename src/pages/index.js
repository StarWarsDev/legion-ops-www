import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import {
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240
    }
}))

export default () => {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    return (
        <Layout>
            <SEO title="Legion Ops - Home" />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Typography variant="h2">Coming Soon</Typography>
                        <Typography variant="subtitle1">
                            This is the future home of <em>Legion Ops</em>, a tool
                            designed to assist with organizing league and tournament
                            play for Star Wars Legion.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Typography variant="h5">Events</Typography>
                        ...
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Activity</Typography>
                        ...
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
