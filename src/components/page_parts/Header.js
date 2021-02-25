import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import ResponsiveDrawer from "./ResponsiveDrawer";
import Navigation from "./Navigation";
// import Search from "./Search";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar,{
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <ResponsiveDrawer/>
        <Navigation/>
        {/* <Search/> */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
