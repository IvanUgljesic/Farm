import React from 'react';
import {
    Card, 
    makeStyles, 
    CardContent,
    Button,
    Grid
} from '@material-ui/core/';
import { Person, ExitToApp } from '@material-ui/icons/';
import { signOut } from '../../../store/actions/authActions';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        backgroundColor: '#3f51b5',
    },
    btn: {
        color: 'white',
        'font-weight': '600'
    }
});

const UserNav = () => {
    const user = useSelector(state => state.firebase.auth.email.slice(0,state.firebase.auth.email.indexOf('@')));
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Card className={classes.root}>

            <CardContent>
            <Grid container justify="space-between">
                <Grid item>
                <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.btn}>
                    <Person />
                    { user }
                </Button>

                </Grid>
                <Grid item>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={() => dispatch(signOut())} className={classes.btn}>
                    <ExitToApp />
                    Logout
                </Button>

                </Grid>
            </Grid>
            </CardContent>
        </Card>
    );
}

export default UserNav;
