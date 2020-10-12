import React from 'react';
import AddForm from './AddForm';
import DeleteForm from './DeleteForm';
import News from '../../News';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons/';
import { useDispatch, useSelector } from "react-redux";
import { switchShowAddForm, switchShowDeleteForm } from '../../../store/actions/newsActions';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const AdminNews = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showAddForm = useSelector(state => state.news.showAddForm);
    const showDeleteForm = useSelector(state => state.news.showDeleteForm);

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
                    nova vest
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
                    izbriši vest
                </Button>
                {  }
            </Grid>
            <Grid item xs={12}>
                { showAddForm ? <AddForm />:showDeleteForm ? <DeleteForm />:'' }
                <Typography variant='h5' align="center" paragraph={true}>Trenutne Vesti</Typography>
                <News />
            </Grid>
        </Grid>
    )
}


export default AdminNews;