import { createMuiTheme } from "@material-ui/core"

const primary = {
  main: "#095",
  light: "#33ad77",
  dark: "#006b3b",
}

const secondary = {
  main: "#904",
  light: "#ad3369",
  dark: "#6b002f",
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary,
    secondary,
  },
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: secondary.main,
        color: "white",
      },
    },
  },
})

export default theme
