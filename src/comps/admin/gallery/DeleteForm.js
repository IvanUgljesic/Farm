import React from 'react';
import { Card, Typography, makeStyles, TextField, MenuItem, Grid, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteImage } from '../../../store/actions/galleryActions';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minWidth: '90%',
      padding: theme.spacing(3),
      border: '3px solid #3f51b5'
    },
  }));

const DeleteForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const working = useSelector(state => state.gallery.working);
    const gallery = props.gallery;
    const [pic, setPic] = React.useState({});

    const handleChange = (e) => {
      let id = e.target.value;
      let temp = gallery.filter(a => a.id === id);
      setPic(...temp);
    }
    const handleSubmit = () => {
      dispatch(deleteImage(pic));
      setPic({});
    }
    return (
        <Card className={classes.root}>
          <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
          <Typography variant='h5' align="left" >Izaberi sliku za brisanje</Typography>

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              margin="dense"
              select
              id="outlined-textarea"
              label="Slika"
              variant="outlined"
              onChange={handleChange}
              value={pic.id || ''}
            >
             {
                gallery ? gallery.map(pic => {
                return (
                  <MenuItem key={pic.id} value={pic.id}>
                    {pic.title}
                  </MenuItem>
                )
              }):<MenuItem>{pic.title}</MenuItem>
             } 
            </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                onClick={handleSubmit}
                >
                Izbriši
                </Button>
            </Grid>
            </Grid>
            {
              working ?
              <Grid container justify="center" alignContent="center">
                <CircularProgress />
              </Grid>
              : ''
            }
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        gallery: state.firestore.ordered.gallery
    }
}

export default compose(
connect(mapStateToProps),
firestoreConnect([
    { collection: 'gallery' }
])
)(DeleteForm);
