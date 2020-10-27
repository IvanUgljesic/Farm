import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  ram: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    padddingTop: theme.spacing(1)
  },
  media: {
    height: '100%',
    width: 'auto',
    minHeight: "40vh",
    backgroundSize: 'contain',
    padding: theme.spacing(1)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    width: '40%',
  },
  left: {
    height: '100%',
  },
  images: {
    'justify-content':"center"
  },
}));

const Rams = (props) => {
  const classes = useStyles();
  const { rams } = props;
  
  //const defaultImages = rams && rams.map((ram,i) => [i]=ram.urls[0]);

  const [currentImgs, setCurrentImgs] = React.useState({});

  const handleClick = (url,index) => {
    setCurrentImgs({
      ...currentImgs,
      [index]:url
    })
  }

  const dateFormat = (date) => {
    let dateParts = date.split('-');
    return ( dateParts[2]+'/'+dateParts[1]+'/'+dateParts[0])
  }
  

  return (
    <div className={classes.root}>
      {
        rams ?
        rams.slice().map((ram, index) => (
          <Card className={classes.ram} key={ram.name}>
            <Grid container spacing={2} direction="row">
              <Grid item xs={12} md={5}>
                <Grid container direction="column">
                  <Grid item xs={12} md={12} align="center">
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {ram.name}
                      </Typography>
                      <Typography variant="caption" color="error">
                        Linija: {ram.bloodLine}
                      </Typography>
                      <Divider />
                      <Typography variant="caption" color="primary">
                        Datum rođenja: {dateFormat(ram.birthDate)}
                      </Typography>
                      <Divider />
                      <Typography variant="caption" color="primary">
                        Tip jagnjenja: { ram.birthType }
                      </Typography>
                      <Divider />
                      <Typography variant="body2" color="textSecondary" component="p">
                        Otac: {ram.father} <br /> Majka: {ram.mother}
                      </Typography>
                      <Divider />
                      <Typography variant="caption">
                        Masa(Kg):
                        <br />
                        1-dan/30-dana/45-dana
                        <br />
                        {ram['1day']} / {ram['30days']} / {ram['45days']}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={7}>
                  <Grid item xs={12}>
                  <CardMedia
                    image={currentImgs[index] ? currentImgs[index]:ram.urls[0]}
                    className={classes.media}
                    title={ram.name}
                  /></Grid>
                  <Grid container spacing={1}>
                      {
                        ram.urls.map((url,i) => (
                          <Grid item xs={4} sm={3}  key={url} align="space-around">
                        <Button 
                        color="primary" 
                        onClick={() => handleClick(url, index)}                          
                        variant={currentImgs[index] === url ? 'outlined':(!currentImgs[index] && i === 0 ) ? 'outlined':'text' }
                        >
                        <Avatar alt="Ovan" src={url}  className={classes.large} />
                        </Button>
                        </Grid>
                        ))
                      }
                  </Grid>
              </Grid>

            </Grid>
          </Card>
        ))
        :
        <></>
      }
    </div>
  );
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
)(Rams);