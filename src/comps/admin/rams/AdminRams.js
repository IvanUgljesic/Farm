import React from 'react';
import AddForm from './AddForm';
import Rams from '../../Rams';
import DeleteForm from './DeleteForm';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons/';
import { useDispatch, useSelector } from "react-redux";
import { switchShowAddForm, switchShowDeleteForm } from '../../../store/actions/ramsActions';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const AdminRams = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showAddForm = useSelector(state => state.rams.showAddForm);
    const showDeleteForm = useSelector(state => state.rams.showDeleteForm);
    return (
        
        <Grid container spacing={2} direction="row">
            <Grid item xs={4}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddCircle />}
                    onClick={() => dispatch(switchShowAddForm(showAddForm))}
                >
                    novi ovan
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Delete />}
                    onClick={() => dispatch(switchShowDeleteForm(showDeleteForm))}
                >
                    izbriši ovna
                </Button>
            </Grid>
            <Grid item xs={12}>
                { showAddForm ? <AddForm />:showDeleteForm ? <DeleteForm />:'' }
                <Typography variant='h5' align="center" paragraph={true}>Ovnovi</Typography>
                <Rams />
            </Grid>
        </Grid>
    )
}

export default AdminRams;
