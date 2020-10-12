import React from 'react'
import { makeStyles, Container, BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { Phone, Facebook, LocationOn } from '@material-ui/icons/';

const useStyles = makeStyles({
    root: {
      'margin-top': '1vh',
      minHeight: "10vh",
      width: "100%",
      background: "#4e4e4e",
    },
    footer: {
      color: "white",
    }
  });


const Footer = () => {
  const classes = useStyles();
    return (
      <Container className={classes.footer}>
        <BottomNavigation
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction className={classes.footer} label="+381 60 448 4581" icon={<Phone />} />
          <BottomNavigationAction className={classes.footer} label="Facebook" icon={<Facebook />} />
          <BottomNavigationAction className={classes.footer} label="Glušci, Srbija" icon={<LocationOn />} />
        </BottomNavigation>
      </Container>
    )
}

export default Footer;
