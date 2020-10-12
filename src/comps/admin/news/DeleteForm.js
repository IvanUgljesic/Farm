import React from 'react';
import { Card, Typography, makeStyles, TextField, MenuItem, Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteAPieceOfNews } from '../../../store/actions/newsActions';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minWidth: '90%',
      padding: theme.spacing(3),
      border: '3px solid #3f51b5'
    },
  }));

const DeleteForm = ({news}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const newsSorted = news && news.slice().sort((a, b) =>  b.createdAt - a.createdAt);
    const [aPieceOfNews, setAPieceOfNews] = React.useState({});

    const handleChange = (e) => {
        let id = e.target.value;
        let temp = newsSorted.filter(a => a.id === id);
        setAPieceOfNews(...temp);
    }
    const handleSubmit = () => { 
      dispatch(deleteAPieceOfNews(aPieceOfNews));
      setAPieceOfNews({});
    }
    return (
        <Card className={classes.root}>
          <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
          <Typography variant='h5' align="left" >Izaberi vest za brisanje</Typography>

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              margin="dense"
              select
              id="outlined-textarea"
              label="Vest"
              variant="outlined"
              onChange={handleChange}
              value={aPieceOfNews.id || ''}
            >
             {
              newsSorted ? newsSorted.map(aPieceOfNews => {
                return (
                  <MenuItem key={aPieceOfNews.id} value={aPieceOfNews.id}>
                    {aPieceOfNews.title}
                  </MenuItem>
                )
              }):<MenuItem>{aPieceOfNews.title}</MenuItem>
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
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        news: state.firestore.ordered.news
    }
}

export default compose(
connect(mapStateToProps),
firestoreConnect([
    { collection: 'news' }
])
)(DeleteForm);
