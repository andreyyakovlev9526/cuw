import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.sass';

function Navigation() {

	return (
		<div className='nav'>

			<NavLink to='/' className='navItem' > Главная </NavLink>
			{/* <NavLink to='/song-list' className='navItem' > Репертуар </NavLink> */}
			<NavLink to='/archive' className='navItem'> Архив </NavLink>
			<NavLink to='/admin' className='navItem'> Админ </NavLink>

		</div>
	);
}

export default Navigation;