import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  makeStyles
 } from '@material-ui/core';
import AdminGallery from './gallery/AdminGallery';
import AdminNews from './news/AdminNews';
import AdminRams from './rams/AdminRams';
import UserNav from './user/UserNav';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  tabsMain: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    padding: '1vh 0',

  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: '#3f51b5',
    minWidth: 140
  },
  tabPanel: {
    minWidth:'40vw',
    minHeight: '80vh',
  },
  tabsFont: { 
    fontWeight: '800',
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
      fontWeight: '600'
    }
  }
}));

const Admin = () => {
  const auth = useSelector(state => state.firebase.auth.uid);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if(!auth) return <Redirect to='Login' />
  return (
    <Paper component="div" className={classes.root}>
    <Box align="center">
      <UserNav />
    </Box>
    <div className={classes.tabsMain}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label={<span className={classes.tabsFont}>Galerija</span>} {...a11yProps(0)}/>
        <Tab label={<span className={classes.tabsFont}>Vesti</span>} {...a11yProps(1)} />
        <Tab label={<span className={classes.tabsFont}>Ovnovi</span>} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <AdminGallery />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <AdminNews />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
        <AdminRams />
      </TabPanel>
    </div>
    </Paper>
  );
}



export default Admin;
