import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
	navContainer: {
		display: 'flex',
		flexWrap: 'wrap'	
	},
	navItem: {
		color: '#fff',
		textDecoration: 'none',
		marginRight: '5vh',
		fontSize: '15px',
	},
})); 

function Navigation() {
	const classes = useStyles();

	return (
		<div className='nav'>
			<div className={classes.navContainer}>
				<Hidden xsDown>
					<NavLink to='/' className={classes.navItem} > Репертуар </NavLink>
					{/* <NavLink to='/song-list' className={classes.navItem} > Репертуар </NavLink> */}
					<NavLink to='/archive' className={classes.navItem}> Архив </NavLink>
					<NavLink to='/admin' className={classes.navItem}> Админ </NavLink>
				</Hidden>
			</div>

		</div>
	);
}

export default Navigation;