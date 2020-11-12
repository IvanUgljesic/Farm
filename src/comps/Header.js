import React from 'react'
import { makeStyles, Box, Grid, IconButton, Fade, Modal, Backdrop, Typography, Tooltip, TextField, Paper, Button, Container } from '@material-ui/core';
import { GiSheep } from 'react-icons/gi';
import { PhoneAndroid, Mail } from '@material-ui/icons/';
import emailjs from 'emailjs-com';
import EmailAlert from './EmailAlert';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    left: {
        display: 'flex',
        'flex-direction': 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    right: {
        display: 'flex',
        'flex-direction': 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    title: {
        fontSize: "2rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1rem",
            fontWeight: '600'
          }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '50px auto'
    },
    contactInfo: {
        fontSize: "1rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.5rem",
            fontWeight: '600'
          }
    },
    infoBtn: {
        padding: theme.spacing(1)
    },
    contact: {
        flexGrow: 1,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        minHeight: '40%',
        maxWidth: '50%',
        [theme.breakpoints.down("sm")]: {
            maxWidth: '80%'
          }
    },
    sum:{
        maxWidth: '60%'
    }
}));

const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const [status, setStatus] = React.useState(null);
    const [state, setState] = React.useState({
        name: '',
        email: '',
        message: '',
        sum: 0,
        a: Math.floor(Math.random() * 10 + 1),
        b: Math.floor(Math.random() * 10 + 1)
    });
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setError('')
        const name = e.target.name;
        setState({
        ...state,
        [name]: name === 'sum' ? Number(e.target.value):e.target.value
        });
    };

    const sendEmail = (e) => {
       e.preventDefault();
       if(state.name === '')setError('Niste uneli Vaše ime');
       else if(!state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))setError('Vaša email adresa nije u ispravnom formatu (naprimer@primer.npr)')
       else if(state.message === '')setError('Upišite poruku');
       else if(state.sum !== (state.a + state.b))setError('Zbir cifara nije tačan');
       else if(error === ''){
        emailjs.sendForm('gmail', 'template_a92khxp', e.target, process.env.REACT_APP_EMAILJS_API_KEY)
            .then(() => {
            setOpen(false);
            setState({
                name: '',
                email: '',
                message: '',
                sum: 0,
                a: Math.floor(Math.random() * 10 + 1),
                b: Math.floor(Math.random() * 10 + 1)                
            })               
            setStatus(true);
            }, (error) => {
                setError(error);           
                setStatus(false);
            });
        }
    }
    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={9} className={classes.left}>
                    <IconButton edge="start" color="inherit" className={classes.title}>
                        <GiSheep size="3em" />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Romanovska
                        <br/>
                        Glušci
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.right}>
                    <IconButton edge="end" className={classes.infoBtn}>
                        <Typography noWrap variant="caption" className={classes.contactInfo}>
                            +381 60 448 4581
                        </Typography>
                        <PhoneAndroid size="1em" />
                    </IconButton>
                    <Tooltip title="Pišite nam" placement="left">
                    <IconButton edge="end" onClick={handleOpen} className={classes.infoBtn}>
                        <Typography variant="caption" className={classes.contactInfo}>
                            romanov.glusci@gmail.com
                        </Typography>
                        <Mail size="1em" />
                    </IconButton>
                    </Tooltip>
                    <Container maxWidth="lg">
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
                        <Paper className={classes.contact}>
                            <form autoComplete="off" onSubmit={sendEmail}>
                            <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <GiSheep size="2em" />
                            <Typography variant="h5" gutterBottom>Pišite nam</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                fullWidth 
                                label="Vaše Ime" 
                                variant="outlined" 
                                name="name"
                                onChange={handleChange}    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                fullWidth  
                                label="Email" 
                                variant="outlined" 
                                type="email" 
                                name="email"
                                onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                multiline 
                                rows={5} 
                                fullWidth 
                                label="Pitanje" 
                                variant="outlined" 
                                name="message"
                                onChange={handleChange} 
                                /> 
                            </Grid>    
                            <Grid item xs={12} align="center">
                                <Box display="flex" direction="row">
                                <Grid container direction="row" alignItems="center">
                                    <Typography variant="subtitle1">
                                    { state.a } + { state.b } = 
                                    </Typography>
                                    <TextField 
                                    name="sum" 
                                    variant="outlined" 
                                    margin="dense" 
                                    className={classes.sum}
                                    onChange={handleChange} 
                                    />
                                </Grid>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.btn} 
                                disableElevation 
                                type="submit" 
                                >
                                Pošalji
                                </Button>
                                </Box>  
                                <Typography variant="caption">Potrudićemo se da na Vaše pitanje odgovorimo u najkraćem roku.</Typography> 
                                <br/>
                                <Typography variant="caption" color="error">{error !== '' ? error:''}</Typography>               
                            </Grid>        
                            </Grid>
                            </form>
                        </Paper>
                    </Fade>
                    </Modal>
                    </Container>
                </Grid>
            </Grid>
            { status &&  <EmailAlert sent={status} setStatus={setStatus}/>}
        </Box>
    )
}

export default Header;
