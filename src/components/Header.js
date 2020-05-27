import React, { useState } from "react"
import clsx from "clsx"
import { Link as GLink } from "gatsby"
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  makeStyles,
  IconButton,
  Drawer,
  Link,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { login, isAuthenticated, getProfile } from "../utils/auth"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer is closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: { ...theme.mixins.toolbar },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  buttonProgress: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  loginWrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}))

export default function Header(props) {
  const classes = useStyles()

  const isAuthed = isAuthenticated()
  let user
  if (isAuthed) {
    user = getProfile()
  }

  const [open, setOpen] = useState(false)
  return (
    <>
      {/* AppBar */}
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Link variant="h6" className={classes.title} component={GLink} to="/">
            Legion Ops
          </Link>

          <div className={classes.loginWrapper}>
            {(!user || !isAuthed) && (
              <Button color="inherit" href="#" onClick={() => login()}>
                Login
              </Button>
            )}

            {user && isAuthed && (
              <React.Fragment>
                <IconButton size="small">
                  <Avatar src={user.picture} />
                </IconButton>
              </React.Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Drawer>
    </>
  )
}
