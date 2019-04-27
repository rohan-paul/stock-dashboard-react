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
import { ExpandLess, ExpandMore, Menu } from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SiteLogo from "../../assets/Images/car.svg";
import DashBoardIcon from "../../assets/Images/Icons/Icons.png";
import AnalyticsIcon from "../../assets/Images/Icons/analytics.png";
import ReportsIcon from "../../assets/Images/Icons/euro-96594_1280.png";
import UserIcon from "../../assets/Images/Icons/5G-web-design-thum-1.jpg";
import SystemIcon from "../../assets/Images/Icons/runer-silhouette-running-fast.png";
import UsersIcon from "../../assets/Images/Icons/custom-web-design-free-template.png";
import ToolsIcon from "../../assets/Images/Icons/images.jpg";
import DepartmentsIcon from "../../assets/Images/Icons/Bold-and-Vibrant-colors.png";
import TransportIcon from "../../assets/Images/Icons/bitcoin.svg";
import ProductionIcon from "../../assets/Images/Icons/tools.png";
import ResearchIcon from "../../assets/Images/Icons/startup-idea-innovation-business-bulb-big-thing.png";
import EducationIcon from "../../assets/Images/Icons/education.png";
import HackingIcon from "../../assets/Images/Icons/hacking.jpg";
import MoneyIcon from "../../assets/Images/Icons/meeting.svg";
import OnBoardPortsIcon from "../../assets/Images/Icons/images.jpeg";
import OptionsIcon from "../../assets/Images/Icons/options.png";
import ComputerIcon from "../../assets/Images/Icons/artwork_2x.png";
import TruckIcon from "../../assets/Images/Icons/fast.svg";
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
          <List>
            <ListItem button onClick={this.handleClickDashboard}>
              <ListItemIcon>
                <img
                  src={DashBoardIcon}
                  className={classes.sideNavBarIconDashboard}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText inset primary="Dashboards" />
              {this.state.openDashboard ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openDashboard}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/analytics"
                >
                  <ListItemIcon>
                    <img
                      src={AnalyticsIcon}
                      className={classes.sideNavBarIcon}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText inset primary="Data" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/overall"
                >
                  <ListItemIcon>
                    <img
                      src={ReportsIcon}
                      className={classes.sideNavBarIcon}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText inset primary="Overall State" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={this.handleClickAdmin}>
              <ListItemIcon>
                <img
                  src={UserIcon}
                  className={classes.sideNavBarIconAdmin}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText inset primary="Admin" />
              {this.state.openAdmin ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.openAdmin} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/route2"
                >
                  <ListItemIcon>
                    <img
                      src={SystemIcon}
                      className={classes.sideNavBarIcon}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText inset primary="Admin Division" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/users"
                >
                  <ListItemIcon>
                    <img
                      src={UsersIcon}
                      className={classes.sideNavBarIcon}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText inset primary="Users" />
                </ListItem>
              </List>
            </Collapse>
          </List>
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
            <ListItem button key="Division-4" component={Link} to="/route-4">
              <ListItemIcon>
                <img
                  src={ProductionIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Division-4" />
            </ListItem>
            <ListItem button key="Division-5" component={Link} to="/route-5">
              <ListItemIcon>
                <img
                  src={ResearchIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Division-5" />
            </ListItem>
            <ListItem button key="Division-6" component={Link} to="/route-6">
              <ListItemIcon>
                <img
                  src={EducationIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Division-6" />
            </ListItem>
            <ListItem button key="Division-7" component={Link} to="/route-7">
              <ListItemIcon>
                <img
                  src={HackingIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Division-7" />
            </ListItem>
            <ListItem button key="Division-8" component={Link} to="/route-8">
              <ListItemIcon>
                <img
                  src={MoneyIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Division-8" />
            </ListItem>
            <ListItem button key="Division-9" component={Link} to="/route-9">
              <ListItemIcon>
                <img
                  src={OnBoardPortsIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary="Division-9" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.handleClickOptions}>
              <ListItemIcon>
                <img
                  src={OptionsIcon}
                  className={classes.sideNavBarIcon}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText inset primary="Common Items" />
              {this.state.openOptions ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.openOptions} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/route-10"
                >
                  <ListItemIcon>
                    <img
                      src={ComputerIcon}
                      className={classes.sideNavBarIcon}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText inset primary="Division-10" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/route-11"
                >
                  <ListItemIcon>
                    <img
                      src={TruckIcon}
                      className={classes.sideNavBarIcon}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText inset primary="Division-11" />
                </ListItem>
              </List>
            </Collapse>
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
