import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ramBackground from '../images/ramBackground.png';
import Info from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  ram: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    marginTop: theme.spacing(2),
    backgroundImage: `url(${ramBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  media: {
    height: 0,
    paddingTop: '100%',
    backgroundSize: 'contain'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    width: '40%',
  },
  left: {
  },
  images: {
    'justify-content':"center"
  }, 
  info: {
    height: '0',
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: "#4e4e4e",
    color: 'white',
    fontWeight: '300',
  },
  tip: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
}));

const  TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
          {children}
          </Box>
        )}
      </div>
    );
}

const Rams1 = (props) => {
  const classes = useStyles();
  const { rams } = props;
  
  //const defaultImages = rams && rams.map((ram,i) => [i]=ram.urls[0]);

  const [currentImgs, setCurrentImgs] = React.useState({});
  const [currentImgsIndex, setCurrentImgsIndex] = React.useState({});

  const handleClick = (url,index, i) => {
    setCurrentImgs({
      ...currentImgs,
      [index]:url
    })
    setCurrentImgsIndex({
        ...currentImgsIndex,
        [index]:i
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
            <Grid container spacing={1} direction="row" alignItems="center" >
              <Grid item xs={12} md={7} className={classes.left}>
                <Grid container direction="column">
                  <Grid item xs={12} md={12} align="center">
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {ram.name}
                      </Typography>
                      <Typography variant="caption" color="error">
                        Krvna linija: {ram.bloodLine}
                      </Typography>
                      <Divider />
                      <Typography variant="caption">
                        Datum rođenja: {dateFormat(ram.birthDate)}
                      </Typography>
                      <Divider />
                      <Typography variant="caption">
                        Tip jagnjenja: { ram.birthType }
                      </Typography>
                      <Divider />
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Box className={classes.info}>
                          <Tooltip className={classes.tip} title="* Pedigre grla (oo - očev otac...)" placement="right"><Info /></Tooltip>
                          </Box>                          
                          <Grid container alignItems="center">{/* father*/}
                            <Grid item xs={12} md={4}>
                          <Typography variant="caption" component="p">
                            Otac:<br/> {ram.father}
                          </Typography>
                          </Grid>
                            <Grid item xs={12} md={8}>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item xs={12}>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p" noWrap>
                                    OO: {ram.oo}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p" noWrap>
                                    OOO: {ram.ooo} <br /> OOM: {ram.oom}
                                  </Typography>
                                </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p">
                                    OM: {ram.om}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p">
                                    OMO: {ram.omo} <br /> OMM: {ram.omm}
                                  </Typography>
                                </Grid>
                                </Grid>
                              </Grid>

                            </Grid>
                          </Grid>
                          </Grid>
                          <Divider />
                          <Grid container alignItems="center">{/* mother*/}
                            <Grid item xs={12} md={4}>
                          <Typography variant="caption" component="p">
                            Majka:<br/> {ram.mother}
                          </Typography>
                          </Grid>
                            <Grid item xs={12} md={8}>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item xs={12}>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p" noWrap>
                                    MO: {ram.mo}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p" noWrap>
                                    MOO: {ram.moo} <br /> MOM: {ram.mom}
                                  </Typography>
                                </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p">
                                    MM: {ram.mm}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="caption" component="p">
                                    MMO: {ram.mmo} <br /> MMM: {ram.mmm}
                                  </Typography>
                                </Grid>
                                </Grid>
                              </Grid>

                            </Grid>
                          </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Typography variant="caption">
                        Masa(Kg):
                        <br />
                        1-dan/30-dana/100-dana
                        <br />
                        {ram['1day']} / {ram['30days']} / {ram['100days']}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                    <TabPanel>
                    <CardMedia
                        image={currentImgs[index] ? currentImgs[index]:ram.urls[0]}
                        className={classes.media}
                        title={ram.name}
                    />
                    </TabPanel>
                    <Tabs
                    value={currentImgsIndex[index] || 0}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    >
                        {
                        ram.urls.map((url, i) => {
                            return (
                            <Tab 
                            label={<Avatar alt="Ovan" src={url} />} 
                            key={url} 
                            onClick={() => handleClick(url, index, i)}
                            />
                            )
                        })
                        }
                    </Tabs>
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
)(Rams1);