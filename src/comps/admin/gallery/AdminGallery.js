import React, { useState } from 'react';
import  ImageGrid1 from '../../ImageGrid1';
import  UploadForm  from './UploadForm';
import Modal from '../../Modal';
import DeleteForm from './DeleteForm';
import { Grid, Button, makeStyles } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons/';
import { useDispatch, useSelector } from "react-redux";
import { switchGalleryForm } from '../../../store/actions/galleryActions';

const useStyles = makeStyles((theme) => ({
    button: {
      padding: theme.spacing(1),
    },
  }));

const AdminGallery = () => {
    const classes = useStyles();
    const [selectedImg, setSelectedImg] = useState(null);
    const dispatch = useDispatch();
    const currentGalleryForm = useSelector(state => state.gallery.currentGalleryForm);

    const showForm = () =>{
        switch(currentGalleryForm){
            case 'add':
                  return <UploadForm />
            case 'delete':
                 return <DeleteForm />
            default:
                 return ''
         }
    }

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    startIcon={<AddCircle />}
                    onClick={() => dispatch(switchGalleryForm(currentGalleryForm === 'add' ? '':'add'))}
                >
                    nova slika
                </Button>
            </Grid>
            <Grid item xs={12} md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    startIcon={<Delete />}
                    onClick={() => dispatch(switchGalleryForm(currentGalleryForm === 'delete' ? '':'delete'))}
                >
                    izbriši sliku
                </Button>
            </Grid>
            {  
                showForm()
            }
            <Grid item xs={12}>
            <ImageGrid1 setSelectedImg={setSelectedImg} />     
            { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> } 
        </Grid>
        </Grid>  
    )
}

export default AdminGallery;