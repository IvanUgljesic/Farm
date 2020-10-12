import React from 'react';
import PropTypes from 'prop-types';
import { GiSheep } from 'react-icons/gi';
import { makeStyles, AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import Home from './Home';
import Gallery from './Gallery';
import Rams from './Rams';
import News from './News';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  links: {
    fontWeight: 600,
    textTransform: 'none',
    flexWrap: 'no-wrap'
  },
  bar : {
    backgroundColor: "white",
    color: "#4e4e4e",
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Nav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered variant="fullWidth" >
          <Tab icon={value===0 ? <GiSheep size="1.5em" />:''} label="Početna" {...a11yProps(0)} className={classes.links}/>
          <Tab icon={value===1 ? <GiSheep size="1.5em" />:''} label="Galerija" {...a11yProps(1)} className={classes.links}/>
          <Tab icon={value===2 ? <GiSheep size="1.5em" />:''} label="Ovnovi" {...a11yProps(2)} className={classes.links}/>
          <Tab icon={value===3 ? <GiSheep size="1.5em"/>:''} label="Vesti" {...a11yProps(3)} className={classes.links}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{minHeight: "100vh", maxheight: "100vh"}}>
        <Home newsClick={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1} style={{minHeight: "100vh"}}>
        <Gallery />
      </TabPanel>
      <TabPanel value={value} index={2} style={{minHeight: "100vh", maxheight: "100vh"}}>
        <Rams />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <News />
      </TabPanel>
    </div>
  )
}

export default Nav;