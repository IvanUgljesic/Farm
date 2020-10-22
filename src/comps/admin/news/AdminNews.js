import React from 'react';
import AddForm from './AddForm';
import DeleteForm from './DeleteForm';
import News from '../../News';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons/';
import { useDispatch, useSelector } from "react-redux";
import { switchNewsForm } from '../../../store/actions/newsActions';

const useStyles = makeStyles((theme) => ({
    button: {
      padding: theme.spacing(1),
    },
  }));

const AdminNews = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentNewsForm = useSelector(state => state.news.currentNewsForm);

    const showForm = () =>{
        switch(currentNewsForm){
            case 'add':
                  return <AddForm />
            case 'delete':
                 return <DeleteForm />
            default:
                 return ''
         }
    }

    return (
        <Grid container spacing={2} direction="row">
            <Grid item xs={12} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    startIcon={<AddCircle />}
                    onClick={() => dispatch(switchNewsForm(currentNewsForm === 'add' ? '':'add'))}
                >
                    nova vest
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    startIcon={<Delete />}
                    onClick={() => dispatch(switchNewsForm(currentNewsForm === 'delete' ? '':'delete'))}
                >
                    izbriši vest
                </Button>
            </Grid>
            <Grid item xs={12}>
                { 
                    showForm() 
                }
                <Typography variant='h5' align="center" paragraph={true}>Trenutne Vesti</Typography>
                <News />
            </Grid>
        </Grid>
    )
}


export default AdminNews;