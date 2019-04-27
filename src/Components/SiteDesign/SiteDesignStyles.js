const drawerWidth = 300;
module.exports = {
  styles: theme => ({
    palette: {
      primary: { main: "#9E9E9E" },
      secondary: { main: "#ee0053" },
      error: { main: "#ee0053" }
    },
    root: {
      display: "flex"
    },
    appRoot: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    profileNameIcon: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginRight: 10
    },
    profileIconButton: {
      borderRadius: 0
    },
    profileButtonIconText: {
      marginLeft: 10
    },
    myAccountIcon: {
      paddingRight: "15px",
      fontSize: "35px",
      height: "20px"
    },
    portIcon: {
      paddingRight: "15px",
      fontSize: "30px",
      height: "20px"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    /* PROBLEM STARTS HERE */
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    /* The below for the width of the side-drawer when the drawer is completely closed */
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing.unit * 10 + 1
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px"
    },
    /* END */
    content: {
      flexGrow: 1,
      width: "100%",
      padding: theme.spacing.unit * 2
    },
    nested: {
      paddingLeft: theme.spacing.unit * 3
    },
    nestedProfile: {
      paddingLeft: theme.spacing.unit * 1
    },
    menuList: {
      position: "relative",
      right: 80
    },
    sideNavBarImageContainer: {
      display: "flex",
      margin: "auto auto auto 10px"
    },
    sideNavBarImage: {
      height: 44,
      width: 44,
      marginRight: 30
    },
    sideNavBarText: {
      marginBottom: 0
    },
    sideNavBarIcon: {
      marginTop: "15px",
      height: 35,
      width: 35
    },
    sideNavBarIconDashboard: {
      marginTop: "15px",
      height: 35,
      width: 35
    },
    sideNavBarIconAdmin: {
      height: 35,
      width: 35
    }
  })
};
