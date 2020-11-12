import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import NewsList from './NewsList';
import Carousel from 'react-material-ui-carousel';
import slider1 from '../images/slider1.jpg';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';
import ramBackground from '../images/ramBackground.png';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
    },
    carousel: {
        width: '100%',
        height: 'auto'        
    },
    media: {
        height: '56.25%',
        width: '100%'
    },
    newsArea: {
        color: "white"
    },
    news: {
        minHeight: '100%',
        cursor: 'pointer',
        backgroundImage: `url(${ramBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        paddingTop: theme.spacing(1)
        
    },
    img : {
        height: '40vh',
        width: '100%',
        minHeight: "40vh",
    }
  }));



const Home = ({newsClick}) => {
    const imgs = [slider1, slider2, slider3];
    const clickHandle = (e) => {
        newsClick(null, 3);
    }

    function Item(props)
    {
        return (
                <img src={props.img} className={classes.media} alt='slider' />
        )
    }
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                    <Carousel className={classes.carousel}>
                    {
                        imgs.map( (item, i) => <Item key={i} img={item}/> )
                    }
                    </Carousel>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Romanovska ovca
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" align="justify">
                            Romanovska ovca je nastala u Rusiji sredinom 19. veka u dolini Volge u Jaroslavskoj oblasti. Ime je dobila po okrugu Romanovo-Borisoglebsk, okolina današnjeg grada Tutajev. Od samog starta je vršen odabir romanovskih ovaca na plodnost, pa je posledica toga odabira do danas u svetu da je romanovska ovca ubedljivo najplodnija rasa ovaca.
                    </Typography>
                    </CardContent>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.news} onClick={clickHandle}>
                <Typography variant="h5" component="h2" align="center" className={classes.newsArea}>
                    Vesti
                </Typography>
                <NewsList />
                </Paper>
            </Grid>
            <Grid className={classes.root}>
                <CardActionArea>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Plodnost
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="justify">
                                    Prosečna plodnost Romanovskih ovaca iznosi oko 260% po jagnjetu (dok uz odličnu ishranu iznosi i preko 400%). Ove ovce takođe imaju i izraženu policikličnost, što znači da se uz odgovarajuću ishranu mogu postići jagnjenja prirodnim putem na svega šest meseci. U jednoj godini se od jedne ovce kada se jagnje svakih 6 meseci dobija u prosjeku od četiri do šest jagnjadi, što je broj koji nijedna druga rasa ne može dati. Na taj način od jednog stada dobijemo od 120 do 180 kg jagnjadi žive mere ako uzmemo da je prosječna težina jagnjadi oko 30 kg. Tu količinu jagnjećeg mesa po ovci prirodnim putem ne može dati nijedna druga rasa za isti period odgoja jagnjadi
                                 </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                className={classes.img}
                                image={require('../images/home2.jpg')}
                                title=""
                            />
                        </Grid>

                    </Grid>
                </CardActionArea>
            </Grid>
            <Grid className={classes.root}>
                <CardActionArea>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                className={classes.img}
                                image={require('../images/home3.jpg')}
                                title=""
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Dimenzije
                        </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align="justify">
                                Ova ovca je skromnijih dimenzija (50 do 60kg, maksimalno 65, a ovnovi do 100kg) i samim tim troši manje hrane od ovaca koje teže od 70 do 100 kg. Grla ove rase su jako otporna, bez ikakvih posebnih zahtjeva prema ishrani i smještaju. Ova ovca je sitnije građe. Ovce dostižu kilažu od 50 do 60kg, dok ovnovi dostižu od 70 do 90kg. Imaju malu uglastu glavu sa zaobljenom lobanjom i kratkim ustima kao i repom koji iznosi od 10 do 15 cm. Visina grebena ovaca je od 60 do 62, a ovnova oko 64 ili 65 cm. Veoma su stabilne konstitucije, imaju kratke noge i veoma sitne kosti zbog kojih se lako jagnje. Također, odmah po jagnjenju, novorođena jagnjad su veoma vitalna i počinju jesti već sa 5 do 7 dana, što je dosta ranije od jagnjadi drugih rasa. Jagnjad su na rođenju potpuno crne vune sa dozvoljenim belinama na glavi, nogama i vrhu repa. Beline po telu osim na navedenim dijelovima tijela nisu dozvoljene. Prosječna težina jaganjaca sa 90 dana iznosi 22-25 kg uz adekvatnu ishranu. Najbolji primjeri dostižu težinu od preko 30 kg za 90 dana. Vuna je gruba, ima sivu boju, zbog mješavine finih, bijelih vlakana. Također je puna i crnih osijastih vlakana. Ovnovi imaju grivu od dugih crnih osastih vlakana oko vrata i na prednjem delu grudi. Prinos vune po ovci iznosi 1,4 - 1,6 kg, a kod ovnova 2 - 3 kg. Noge, lice i uši kod životinja ove rase su obrasli kratkom crnom dlakom, a delomično i bijelom zbog šara koje se javljaju. Kod ovaca ove rase dosta dobro je izražena sposobnost za proizvodnju mleka
                        </Typography>
                            </CardContent>
                        </Grid>

                    </Grid>
                </CardActionArea>
            </Grid>
        </Grid>
        </div>
    )
}

export default Home;
