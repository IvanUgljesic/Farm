import React, { useState } from 'react';
import  ImageGrid1 from '../../ImageGrid1';
import  UploadForm  from './UploadForm';
import Modal from '../../Modal';
import DeleteForm from './DeleteForm';
import { Box, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons/';
import { useDispatch, useSelector } from "react-redux";
import { switchShowAddForm, switchShowDeleteForm } from '../../../store/actions/galleryActions';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const AdminGallery = () => {
    const classes = useStyles();
    const [selectedImg, setSelectedImg] = useState(null);
    const dispatch = useDispatch();
    const showAddForm = useSelector(state => state.gallery.showAddFormGallery);
    const showDeleteForm = useSelector(state => state.gallery.showDeleteFormGallery);
    return (
        <Box>
        <Grid container direction="row">
            <Grid item xs={4}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddCircle />}
                onClick={() => dispatch(switchShowAddForm(showAddForm))}
            >
                nova slika
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
                    izbriši sliku
                </Button>
            </Grid>
            { showAddForm ? <UploadForm />:showDeleteForm ? <DeleteForm />:'' }
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h5' align="center" paragraph={true}>Galerija</Typography>
            <ImageGrid1 setSelectedImg={setSelectedImg} />     
            { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> } 
        </Grid>      
        </Box>
    )
}

export default AdminGallery;