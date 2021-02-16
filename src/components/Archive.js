import React, { useEffect, useState } from "react";
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Generate = element => {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Archive = () => {
	const classes = useStyles();
	
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

	useEffect(() => {
		fetch('http://localhost:3000/api/songs')
		 .then(res => res.json())
		 .then(
			 (result) => {
				 setIsLoaded(true);
				 setItems(result);
			 },
			 (error) => {
				 setIsLoaded(true);
				 setError(error);
			 }
		 );
	}, [])

	if (error) {
		return <div> Ошибка: {error.message} </div>
	} else if (!isLoaded) {
		return <div> Загрузка... </div>
	} else {
		return (
			<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
		<Typography variant="h6" className={classes.title}>
      Архив песен
    </Typography>
    <div className={classes.demo}>
		{items.map(item => (
      <List dense={dense}>
        {Generate(
        	<ListItem>
            <ListItemText
							primary={item.title}
              secondary={item.titleEn}
            />
          </ListItem>,
        )}
      </List>
			))}
    </div>
   </Grid>
</Grid>
			// <ul>
			// 	{items.map(item => (
			// 		<li key={item.title}>
			// 			{item.title}
			// 		</li>
			// 	))}
			// </ul>
	);
	}
}

export default Archive;

{/* <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
		<Typography variant="h6" className={classes.title}>
      Архив песен
    </Typography>
    <div className={classes.demo}>
      <List dense={dense}>
        {generate(
        	<ListItem>
            <ListItemText
							primary="Single-line item"
              secondary={secondary ? 'Secondary text' : null}
            />
          </ListItem>,
        )}
      </List>
    </div>
   </Grid>
</Grid> */}