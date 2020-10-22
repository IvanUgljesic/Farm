import React from 'react';
import Rams from '../../Rams';
import AddForm from './AddForm';
import DeleteForm from './DeleteForm';
import EditRam from './EditRam';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { AddCircle, Delete, Edit } from '@material-ui/icons/';
import { useDispatch, useSelector } from "react-redux";
import { switchRamForm } from '../../../store/actions/ramsActions';

const useStyles = makeStyles((theme) => ({
    button: {
      padding: theme.spacing(1),
    },
  }));

const AdminRams = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentRamForm = useSelector(state => state.rams.currentRamForm);

    const showForm = () =>{
        switch(currentRamForm){
            case 'add':
                  return <AddForm />
            case 'edit':
                 return <EditRam />
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
                    onClick={() => dispatch(switchRamForm(currentRamForm ==='add'? '':'add'))}
                >
                    novi ovan
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    startIcon={<Delete />}
                    onClick={() => dispatch(switchRamForm(currentRamForm ==='delete'? '':'delete'))}
                >
                    izbriši ovna
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    startIcon={<Edit />}
                    onClick={() => dispatch(switchRamForm(currentRamForm ==='edit'? '':'edit'))}
                >
                    izmeni ovna
                </Button>
            </Grid>
            <Grid item xs={12}>
                {  
                    showForm()
                }
                <Typography variant='h5' align="center" paragraph={true}>Ovnovi</Typography>
                <Rams />
            </Grid>
        </Grid>
    )
}

export default AdminRams;
