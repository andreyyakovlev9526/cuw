import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/App.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import Header from "./page_parts/Header";

const styles = theme => ({

});

class Home extends Component {

  constructor() {
    super();
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      selectedDate: '',
    }
  }

  handleDateChange(defaulValue) {
    this.setState({
      selectedDate: defaulValue,
    });
  }

  render() {

    const { classes } = this.props;

    const calendars = () => {
      const defaultValue = {
        year: 2020,
        month: 9,
        day: 25,
      };

      return (
        <Calendar
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          shouldHighlightWeekends
          customDaysClassName={[
            { year: 2020, month: 11, day: 4, className: 'purpleDay' },
            { year: 2020, month: 11, day: 12, className: 'orangeDay' },
            { year: 2020, month: 11, day: 18, className: 'yellowDay' },
          ]}
        />
      );
    }

    return (
      <div>
        <CssBaseline />
        <Header />
        <div className='main'>
          {calendars()}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
