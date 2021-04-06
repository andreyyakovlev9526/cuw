
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ListItemLink = (props) => {
  const { icon, primary, to, onClick} = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      {/*<ListItem button component={renderLink} onClick={onClick}>*/}
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List onClick={handleDrawerToggle}
        subheader={
          <ListSubheader component="div">
            Навигация
          </ListSubheader>
        }
      >
        <Divider />
        <ListItemLink to='/' primary='Репертуар' icon={<PlaylistPlayIcon />} />
        <ListItemLink to='/archive' primary='Архив' icon={<LibraryMusicIcon />} />
        <ListSubheader component="div">
          Админ
        </ListSubheader>
        <Divider />
        <List component="div">
          <ListItemLink to='/admin/song-list' primary='Репертуар' icon={<PlaylistAddIcon />} />
          <ListItemLink to='/admin/songs' primary='Песни' icon={<MusicNoteIcon />} />
          <ListItemLink to='/admin/members' primary='Участники' icon={<PeopleIcon />} />
          <ListItemLink to='/admin/users' primary='Пользователи' icon={<AccountCircleIcon />} />
        </List>
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
      </nav>
    </div>
  );
}

export default ResponsiveDrawer
