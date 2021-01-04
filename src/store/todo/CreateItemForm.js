import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import * as actionTypes from '../actions/actions';

const useStyles = makeStyles({

});

const CreateItemForm = ({ title, setTitle, addItem, editItem, edit, error, setError }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    const title = event.target.value;

    setTitle(title);
    if(title.length === 0){
      setError("Введите название песни!");
    } else {
      setError("");
    }
  }

  const handleClick = () => {
    if(title.length === 0){
      setError("Введите название песни!");
      return;
    }
    if (edit) {
      editItem();
    } else {
      addItem();
    }
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <TextField
            id="sheetTitle"
            required
            value={title}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            label="Введите название.."
            multiline
            name="sheetTitle"
          />
          {/*<TextField value={title} onChange={handleChange}*/}
          {/*           error={!!error} helperText={error} id="outlined-basic" fullWidth label="Введите название.." multiline variant="outlined" />*/}
        </Grid>
        <Grid item md={12}>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>
            {edit ? "Редактировать" : "Создать"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
const mapStateToProps = (state) => {
  return {
    title: state.title,
    edit: state.edit,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTitle: (title) => dispatch(actionTypes.setTitle(title)),
    setError: (error) => dispatch(actionTypes.setError(error)),
    addItem: () => dispatch(actionTypes.addItem()),
    editItem: () => dispatch(actionTypes.editItem()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemForm);
