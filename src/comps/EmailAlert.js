import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const EmailAlert = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {   !props.sent ?
      <Alert 
      severity="error"
      action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setStatus(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
      >
        <AlertTitle>Greška</AlertTitle>
        Desila se greška prilikom slanja vašeg emaila — <strong>Pokušajte ponovo!</strong>
      </Alert>:
      <Alert 
      severity="success"
      action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setStatus(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
      >
        <AlertTitle>Status</AlertTitle>
        Mejl uspešno poslat — <strong>Hvala!</strong>
      </Alert>

    }
    </div>
  );
}

export default EmailAlert;