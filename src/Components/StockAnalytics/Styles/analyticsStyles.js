var styles = theme => ({
  root: {
    flexGrow: 1
  },

  topLeftPaper: {
    width: "100%",
    height: "145px",
    paddingLeft: "15px",
    verticalAlign: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgb(255, 87, 34)",
    borderRadius: "5px",
    fontSize: 20,
    cursor: "pointer"
  },

  topRightPaper: {
    marginLeft: "15px",
    width: "100%",
    height: "145px",
    paddingLeft: "15px",
    verticalAlign: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgb(41, 182, 246)",
    borderRadius: "5px",
    fontSize: 20,
    cursor: "pointer"
  },

  bottomLeftPaper: {
    marginTop: "15px",
    width: "100%",
    minWidth: "400px",
    height: "550px",
    paddingLeft: "15px",
    verticalAlign: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "white",
    borderRadius: "5px",
    fontSize: 20,
    cursor: "pointer",
    marginTop: theme.spacing.unit * 6,
    overflow: "auto"
  },

  bottomRightPaper: {
    marginLeft: "15px",
    marginTop: "15px",
    width: "100%",
    height: "550px",
    paddingLeft: "15px",
    verticalAlign: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "white",
    borderRadius: "5px",
    fontSize: 20,
    cursor: "pointer",
    marginTop: theme.spacing.unit * 6,
    overflow: "auto"
  },

  anchorIcon: {
    paddingRight: "15px",
    marginTop: "20%",
    marginRight: "85%"
  },

  portuser: {
    marginLeft: "85%",
    marginTop: "2%",
    marginBottom: "10%",
    fontSize: "65px"
  },

  ports: {
    marginLeft: "80%",
    fontSize: "65px"
  },

  numberofPorts: {
    float: "right",
    paddingRight: "3%",
    fontSize: "25px"
  },

  divider: {
    height: theme.spacing.unit * 2
  }
});

export default styles;
