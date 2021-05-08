import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';


const useStyles = makeStyles(() => ({
    errorMessage: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10
    }
}));

const ErrorMessage = ({
    message
}) => {

    const classes = useStyles();

    return (
        <div className={classes.errorMessage}>
            <WarningRoundedIcon style={{ color: 'red' }}/>
            {message}
        </div>
    )
}

export default ErrorMessage