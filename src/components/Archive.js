import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const Archive = () => {

	const classes = useStyles();
	
	return (
		<div>
			<div className='main'>
				<h1>Archive</h1>
				<p>Archive page body content</p>
			</div>
		</div>
	);
}

export default Archive;