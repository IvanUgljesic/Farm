import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  makeStyles
 } from '@material-ui/core';
import AdminGallery from './gallery/AdminGallery';
import AdminNews from './news/AdminNews';
import AdminRams from './rams/AdminRams';
import { connect } from 'react-redux';
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
        <Box p={3}>
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
    backgroundColor: theme.palette.background.paper,
    display: 'flex',

  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: '30%',
    color: '#3f51b5',
    'font-weight': '800'
  },
  tabPanel: {
    minWidth:'70%',
    minHeight: '80vh',
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
    <Container spacing={3}>
    <Box align="center">
      <UserNav />
    </Box>
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Galerija" {...a11yProps(0)} />
        <Tab label="Vesti" {...a11yProps(1)} />
        <Tab label="Ovnovi" {...a11yProps(2)} />
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
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {

  }
}



export default connect(mapStateToProps)(Admin);
