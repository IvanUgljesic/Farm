import React from 'react';
import { Card, Typography, makeStyles, TextField, MenuItem, Grid, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteRam } from '../../../store/actions/ramsActions';
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
    const working = useSelector(state => state.rams.working);
    const rams = props.rams;
    const [ram, setRam] = React.useState({});

    const handleChange = (e) => {
      let id = e.target.value;
      let temp = rams.filter(a => a.id === id)
        setRam(...temp);
    }
    const handleSubmit = () => {
      dispatch(deleteRam(ram));
    }
    return (
        <Card className={classes.root}>
          <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
          <Typography variant='h5' align="left" >Izaberi ovna za brisanje</Typography>

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              margin="dense"
              select
              id="outlined-textarea"
              label="Ovan"
              variant="outlined"
              onChange={handleChange}
              value={ram.id || ''}
            >
             {
                rams ? rams.map(ram => {
                return (
                  <MenuItem key={ram.id} value={ram.id}>
                    {ram.name}
                  </MenuItem>
                )
              }):<MenuItem>{ram.name}</MenuItem>
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
        rams: state.firestore.ordered.rams
    }
}

export default compose(
connect(mapStateToProps),
firestoreConnect([
    { collection: 'rams' }
])
)(DeleteForm);
