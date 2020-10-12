import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Divider, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));

const NewsSummary = ({ aPieceOfNews }) => {
    const classes = useStyles();

    return (
        <Container>
            <ListItem>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item md={6} xs={4}>
                        <ListItemAvatar>
                            <Avatar alt="img" src={aPieceOfNews.url} variant="square" className={classes.large}/>
                        </ListItemAvatar>
                    </Grid>
                    <Grid item md={6} xs={8}>
                        <ListItemText
                            primary={aPieceOfNews.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {moment(aPieceOfNews.createdAt.toDate()).format('DD/MM/YYYY')}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </Container>
    )
}


export default NewsSummary;