import React from "react";
import history from "../../history";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { styles } from "./SiteDesignStyles";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Switch,
  Toolbar,
  Typography,
  MenuItem,
  MenuList
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Menu } from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SiteLogo from "../../assets/Images/car.svg";
import ToolsIcon from "../../assets/Images/Icons/images.jpg";
import DepartmentsIcon from "../../assets/Images/Icons/Bold-and-Vibrant-colors.png";
import TransportIcon from "../../assets/Images/Icons/bitcoin.svg";
import AllRoutes from "../../Routes/DashboardRoutes";

class SiteDesign extends React.Component {
  state = {
    open: false,
    openDashboard: false,
    openAdmin: false,
    openOptions: false,
    openWebAdmin: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true,
      openAdmin: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
      openDashboard: false,
      openAdmin: false,
      openOptions: false,
      openWebAdmin: false
    });
  };

  handleClickDashboard = () => {
    this.setState(state => ({
      openDashboard: !state.openDashboard,
      openAdmin: false,
      openOptions: false,
      openWebAdmin: false
    }));
  };

  handleClickAdmin = () => {
    this.setState(state => ({
      openAdmin: !state.openAdmin,
      openDashboard: false,
      openOptions: false,
      openWebAdmin: false
    }));
  };

  handleClickOptions = () => {
    this.setState(state => ({
      openOptions: !state.openOptions,
      openAdmin: false,
      openDashboard: false,
      openWebAdmin: false
    }));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const {
      classes,
      children,
      theme,
      themeType,
      handleThemeTypeChange
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.appRoot}>
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <Menu />
              </IconButton>
              {this.state.open ? (
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                  noWrap
                />
              ) : (
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.title}
                  noWrap
                >
                  REACT APP
                </Typography>
              )}
              <Switch
                checked={themeType}
                onChange={handleThemeTypeChange}
                value={themeType}
                color="default"
              />

              <div>
                <div className={classes.profileNameIcon}>
                  <IconButton
                    position="fixed"
                    aria-owns={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    className={classes.profileIconButton}
                  >
                    <img
                      src={require("../../assets/Images/Icons/depositphotos_68236367-stock-illustration-truck-with-mexican-food.jpg")}
                      alt=""
                      style={{
                        width: 42,
                        height: 42
                      }}
                    />
                    <Typography
                      variant="body2"
                      className={classes.profileButtonIconText}
                    >
                      Rohan | Paul
                    </Typography>
                  </IconButton>
                </div>

                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper style={{ marginRight: "100px" }}>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <ListItem
                              button
                              className={classes.nestedProfile}
                              component={Link}
                              to="/profile"
                              onClick={this.handleClose}
                            >
                              <AccountCircle
                                className={classes.myAccountIcon}
                              />{" "}
                              My account
                            </ListItem>

                            <MenuItem onClose={this.handleClose}>
                              <ExitToApp style={{ paddingRight: "25px" }} /> Log
                              Out
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <div className={classes.sideNavBarImageContainer}>
              <img
                src={SiteLogo}
                alt="Port Logo"
                className={classes.sideNavBarImage}
              />
              <h5 className={classes.sideNavBarText}>REACT APP</h5>
            </div>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List />
          <Divider />
          <List>
            <ListItem
              button
              key="Stock Dashboard"
              component={Link}
              to="/stock_dashboard"
            >
              <ListItemIcon>
                <img
                  src={ToolsIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Stock Dashboard" />
            </ListItem>
            <ListItem
              button
              key="CSV Parsing"
              component={Link}
              to="/csvparsing"
            >
              <ListItemIcon>
                <img
                  src={DepartmentsIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="CSV Parsing" />
            </ListItem>
            <ListItem
              button
              key="Bitcoin Pricing"
              component={Link}
              to="/bitcoin"
            >
              <ListItemIcon>
                <img
                  src={TransportIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Bitcoin Pricing" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AllRoutes />
        </main>
      </div>
    );
  }
}

SiteDesign.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SiteDesign);
