import React from 'react'
import { makeStyles, Container, BottomNavigationAction, BottomNavigation, Typography, Modal, Fade, Backdrop, Tooltip } from '@material-ui/core';
import { Phone, Facebook, LocationOn } from '@material-ui/icons/';

const useStyles = makeStyles((theme) =>({
  root: {
    marginTop: '1vh',
    minHeight: "10vh",
    width: "100%",
    background: "#4e4e4e",
  },
  footer: {
    color: "white",
    alignItems: 'center'
  },
  phone: {
    fontSize: '12px'

  },
  mapouter:{
    margin: '120px auto',
    position:'relative',
    textAlign:'right',
    height:'50vh',
    width:'60vw',
    [theme.breakpoints.down("sm")]: {
      margin: '20px auto',
      height:'80vh',
      width:'90vw',
    }
  },
  canvas: {
    overflow:'hidden',
    background:'none!important',
    height:'50vh',
    width:'60vw',
    [theme.breakpoints.down("sm")]: {
      height:'80vh',
      width:'90vw',
    }
  }

}));


const Footer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className={classes.footer}>
      <BottomNavigation
        showLabels
        className={classes.root}
      >
        <Tooltip title="Pozovite nas">
        <BottomNavigationAction
          className={classes.footer}
          label={<Typography className={classes.phone} variant="caption">+381 60 448 4581</Typography>}
          icon={<Phone />}
        />      
        </Tooltip>  
        <Tooltip title="Posetite našu facebook stranicu">
        <BottomNavigationAction
          className={classes.footer}
          label={<Typography variant="caption">Facebook</Typography>}
          icon={<Facebook />}
        />
        </Tooltip>
        <Tooltip title="Pogledajte našu lokaciju">
        <BottomNavigationAction
          className={classes.footer}
          label={<Typography variant="caption">Glušci, Srbija</Typography>}
          icon={<LocationOn />}
          onClick={handleOpen}
        />
        </Tooltip>
      </BottomNavigation>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.mapouter}>
            <div className={classes.canvas}>
              <iframe 
              title="Google-maps"
              width="100%" 
              height="100%"
              src="https://maps.google.com/maps?q=svetomira%20alimpica%2098%2C%20glusci&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              frameBorder="0"  
              marginHeight="0" 
              marginWidth="0">                
              </iframe>
              </div>
            </div>
        </Fade>
      </Modal>
    </Container>
  )
}

export default Footer;
