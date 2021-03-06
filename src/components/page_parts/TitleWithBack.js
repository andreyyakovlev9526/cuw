import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        whiteSpace: 'nowrap'
    }
}));

function TitleWithBack(props) {
    const classes = useStyles();
    return (
        <h1 className={classes.header}>
            {/*<Link to='/admin'>*/}
            {/*    <ArrowBackIcon />*/}
            {/*</Link>*/}
            {/*&nbsp;*/}
            {props.title}
        </h1>
    );
}

export default TitleWithBack;
