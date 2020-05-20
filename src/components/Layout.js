import React from "react";
import theme from "../theme";
import {Container, CssBaseline} from "@material-ui/core";
import Header from "./Header";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import SEO from "./SEO";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBarSpacer: {
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}))

export default function Layout({ children }) {
    const classes = useStyles()
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <Header />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="xl" className={classes.container}>
                        {children}
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    )
}
