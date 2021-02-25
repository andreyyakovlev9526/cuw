
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import ListSubheader from '@material-ui/core/ListSubheader';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerClose: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar, 
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // const primaryDrawerNav = ['Репертуар', 'Архив',];
  // const adminCategories = ['Репертуар', 'Песни', 'Участники', 'Пользователи',];

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
        {/* <Divider /> */}
      <List
        subheader={
          <ListSubheader component="div">
            Cherkassy Worship United
          </ListSubheader>
        }
      >
        <Divider />
        <ListItem button component={Link} to='/'>
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
          <ListItemText primary="Репертуар" />
        </ListItem>
        <ListItem button component={Link} to='/archive'>
            <ListItemIcon>
              <LibraryMusicIcon />
            </ListItemIcon>
          <ListItemText primary="Архив" />
        </ListItem>
          {/* {primaryDrawerNav.map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        <ListItem button onClick={handleClick} >
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Админ" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Divider />
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem 
              button 
              className={classes.nested} 
              component={Link} 
              to='/admin/song-list'
            > 
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="Репертуар" />
            </ListItem>
            <ListItem 
              button 
              className={classes.nested}
              component={Link} 
              to='/admin/songs'
            >
              <ListItemIcon>
                <MusicNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Песни" />
            </ListItem>
            <ListItem 
              button 
              className={classes.nested}
              component={Link} 
              to='/admin/members'
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Участники" />
            </ListItem>
            <ListItem 
              button 
              className={classes.nested}
              component={Link} 
              to='/admin/users'
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Пользователи" />
            </ListItem>
              {/* {adminCategories.map((text, index) => (
                <ListItem key={text} button className={classes.nested}>
                  <ListItemText primary={text} />
                </ListItem>
              ))} */}
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer} aria-label="mainNav">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawerClose}
            variant='permanent'
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer
