import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import '../../styles/App.css';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Header from "../page_parts/Header";

const styles = theme => ({
	paper: {
		padding: theme.spacing(15, 10),
		textAlign: 'center',
		color: theme.palette.text.primary,
		backgroundColor: '#f4f2ff',
		fontSize: 18,
	},

});

class Admin extends Component {

	constructor(props) {
		super(props);

	}

	render() {

		const { classes } = this.props;

		return (
			<div>
				<CssBaseline />
				<Header />
				<div className='main'>
					<Grid container spacing={1}>
						<Grid container item xs={12} spacing={3}>
							<React.Fragment>
								<Grid item xs={3}>
									<Link to='/admin/song-list' style={{ textDecoration: 'none' }}>
										<Paper className={classes.paper} elevation={3} square>
											Репертуар
										</Paper>
									</Link>
								</Grid>
								<Grid item xs={3}>
									<Link to='/admin/users' style={{ textDecoration: 'none' }}>
										<Paper className={classes.paper} elevation={3} square>
											Пользователи
										</Paper>
									</Link>
								</Grid>
								<Grid item xs={3}>
									<Link to='/admin/songs' style={{ textDecoration: 'none' }}>
										<Paper className={classes.paper} elevation={3} square>
											Песни
										</Paper>
									</Link>
								</Grid>
								<Grid item xs={3}>
									<Link to='/admin/members' style={{ textDecoration: 'none' }}>
										<Paper className={classes.paper} elevation={3} square>
											Участники
										</Paper>
									</Link>
								</Grid>
							</React.Fragment>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

Admin.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);