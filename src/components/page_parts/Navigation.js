import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
	navContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > a': {
			color: '#fff',
			marginRight: '5vh',
			fontSize: '15px',
			textDecoration: 'none',
		},	
	},
	adminDropMenu: {
		'& > li > a': {
			color: "#000",
			textDecoration: 'none',
		},
	},
	paper: {
    marginRight: theme.spacing(2),
  },
})); 

function Navigation() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

	const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

	function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

	const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


	return (
		<div>
	  	<div className='nav'>
				<div className={classes.navContainer}>
					<Hidden xsDown>
						<NavLink to='/' > Репертуар </NavLink>
						<NavLink to='/archive'> Архив </NavLink>
						<NavLink to={anchorRef} onClick={handleToggle} ref={anchorRef} aria-haspopup="true" 
							aria-controls={open ? 'menu-list-grow' : undefined}
						> 
							Админ 
						</NavLink>
					</Hidden> 
				</div>
			</div> 
			<div>
				<Hidden xsDown>
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={open} id="menu-list-grow" className={classes.adminDropMenu} onKeyDown={handleListKeyDown} >
											<MenuItem onClick={handleClose} component={NavLink} to='/admin/song-list'> Репертуар </MenuItem>
											<MenuItem onClick={handleClose} component={NavLink} to='/admin/songs'> Песни </MenuItem>
											<MenuItem onClick={handleClose} component={NavLink} to='/admin/members'> Участники </MenuItem>
											<MenuItem onClick={handleClose} component={NavLink} to='/admin/users'> Пользователи </MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
				</Hidden>
			</div>
		</div>
	);
}

export default Navigation;