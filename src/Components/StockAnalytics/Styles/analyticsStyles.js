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
    height: "450px",
    paddingLeft: "15px",
    verticalAlign: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "white",
    borderRadius: "5px",
    fontSize: 20,
    cursor: "pointer",
    overflow: "auto"
  },

  bottomRightPaper: {
    marginLeft: "15px",
    marginTop: "15px",
    width: "100%",
    height: "450px",
    paddingLeft: "15px",
    verticalAlign: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "white",
    borderRadius: "5px",
    fontSize: 20,
    cursor: "pointer",
    overflow: "auto"
  },
  topSearchBarPaper: {
    display: "flex",
    flexDirection: "row",
    margin: "70px auto 0",
    maxWidth: "100%",
    height: "75px"
  },
  reactSelectAndDatePicker: {
    display: "flex",
    flexDirection: "row",
    margin: "auto"
  },

  bothDatePicker: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "10px",
    marginTop: 0
  },

  individualDatePicker: {
    marginLeft: "10px",
    width: "30%",
    marginTop: 0
  },

  button: {
    marginLeft: "15px"
  },

  rightIcon: {
    marginLeft: theme.spacing.unit
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

  /* styles for the Autocompletion while searching for stock ticker */
  /*  List: {
    border: 1px solid #d9dddd;
  },


  ListItemOdd : {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ListItemEven: {
    background-color: #f8f8f0;
  } */
});

export default styles;
