import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
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
					<NavLink
					 to={anchorRef} 
					 ref={anchorRef}
					 aria-controls={open ? 'menu-list-grow' : undefined}
					 aria-haspopup="true"
					 onClick={handleToggle}
					> 
					 	Админ 
					</NavLink>
				</Hidden> 
		  </div>
		</div> 
		<div>
		<Hidden xsDown>
		{/* <Button
			ref={anchorRef}
			aria-controls={open ? 'menu-list-grow' : undefined}
			aria-haspopup="true"
			onClick={handleToggle}
		>
			Админ
		</Button> */}
		<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList 
								autoFocusItem={open} 
								id="menu-list-grow" 
								className={classes.adminDropMenu}
								onKeyDown={handleListKeyDown} 
							>
									<MenuItem onClick={handleClose}>
										<NavLink to='/admin/song-list'> Репертуар </NavLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<NavLink to='/admin/songs'> Песни </NavLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<NavLink to='/admin/members'> Участники </NavLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<NavLink to='/admin/users'> Пользователи </NavLink>
									</MenuItem>
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