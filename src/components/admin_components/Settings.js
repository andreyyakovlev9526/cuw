import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../../styles/App.css';

const drawerWidth = 240;

const styles = theme => ({});

class Settings extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <div className='main'>
          <h1>Settings</h1>
          <p>Settings page body content</p>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);