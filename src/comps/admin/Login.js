import React from 'react'
import { Paper, makeStyles, TextField, Grid, Typography, Button } from '@material-ui/core';
import { GiSheep } from 'react-icons/gi';
import { signIn, clearError } from '../../store/actions/authActions';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      minHeight: '85vh',
      justifyContent: 'center',
    },
    btn : {
        margin: theme.spacing(1)
    },
    txt : {
        margin: theme.spacing(2),
        width: '95%'
    },
  }));

const Login = () => {
    const auth = useSelector(state => state.firebase.auth.uid);
    const authError = useSelector(state => state.auth.authError);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn({email, password}));
    }

    const handleChange = (e) => {
        dispatch(clearError());
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }
    if(auth) return <Redirect to='/Admin' />
    return (
        <Paper>
        <form noValidate autoComplete="off" className={classes.root}>
        <Grid container alignItems="center" direction="column" spacing={2}>
            <Grid item xs={2} align="center">
                <GiSheep size="6em" />
                <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid item sx={6}>
                <TextField
                label="Email"
                helperText=''
                margin="normal"
                type="email"
                name="email"
                variant="outlined"
                className={classes.txt}
                onChange={handleChange}
                />
                <TextField
                label="Šifra"
                margin="normal"
                variant="outlined"
                type="password"
                name="password"
                className={classes.txt}
                onChange={handleChange}
                />               
            </Grid>
            <Grid item xs={3} align='center'>
                <Button 
                variant="contained" 
                color="primary"
                onClick={handleSubmit} 
                className={classes.btn}
                type="submit"
                >
                    Potvrdi
                </Button> 
                <Typography variant="caption" color="secondary" noWrap>
                    { authError ? authError:null }
                </Typography>

            </Grid>
        </Grid>
        </form> 
        </Paper>
    )
}

export default Login
