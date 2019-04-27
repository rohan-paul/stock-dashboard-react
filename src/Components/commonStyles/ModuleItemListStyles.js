export const styles = theme => ({
  palette: {
    primary: { main: "#2196f3" },
    secondary: { main: "#fdff00" },
    error: { main: "#ee0053" }
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    overflow: "auto"
  },
  space: {
    marginTop: theme.spacing.unit * 2
  },
  fab: {
    margin: theme.spacing.unit
  },
  fabButton: {
    margin: theme.spacing.unit,
    marginLeft: "46%"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 16
  }
});
