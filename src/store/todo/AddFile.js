import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreatedItemList from './CreatedItemList';
import CreateItemForm from "./CreateItemForm";

const useStyles = makeStyles({

});

const AddFile = () => {
  const classes = useStyles();
  return (
    <div>
      <CreateItemForm />
      <CreatedItemList />
    </div>
  )

}
export default AddFile;