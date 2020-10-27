import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import NewsSummary from './NewsSummary';
import List from '@material-ui/core/List';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      color: "white"
    },
  }));

const NewsList = ({news}) => {
    const classes = useStyles();    
    const newsSorted = news ? news.slice().sort((a,b) => b.createdAt - a.createdAt): null

    return (
        newsSorted ?
        <List className={classes.root}>
            {
                newsSorted && newsSorted.slice(0,5).map(aPieceOfNews => {
                    return (
                        <NewsSummary aPieceOfNews={aPieceOfNews} key={aPieceOfNews.id}/>
                    )
                })
            }
        </List>:
        <Grid container justify="center">
            <Typography variant="h6">Učitavanje...</Typography>
        </Grid>
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
)(NewsList);