import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Header from "./page_parts/Header";

const useStyles = makeStyles((theme) => ({

}));

const Archive = () => {

	const classes = useStyles();
	
	return (
		<div>
			<Header />
			<div className='main'>
				<h1>Archive</h1>
				<p>Archive page body content</p>
			</div>
		</div>
	);
}

export default Archive;