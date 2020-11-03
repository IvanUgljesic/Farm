import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import { GiSheep } from 'react-icons/gi';
import { ExpandMore, ArrowForwardIos, ArrowBackIos, ExpandLess, Category } from '@material-ui/icons/';
import { 
  Select, 
  InputLabel,
  Chip,
  Grid,
  Button,
  FormControl,
  CircularProgress,
  Tooltip
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '75vh',
    },
    cards: {
      width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '100%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: "#4e4e4e",
    },
    filter: {
      minHeight: '6vh',
      marginBottom: '1vh',
    },
    select: {
      maxHeight: '4vh'
    },
    large: {
      width: 'auto',  
      maxWidth: '100%',
      maxHeight: '40vh',
    },
    btn: {
      textTransform: 'none',
      maxHeight: '4vh'
    },
    active: {
      color: '#009933',
      borderColor: '#009933'
    },
    page: {
      marginTop: theme.spacing(2),
    }
  }));

const News = ({ news }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [catFilter, setCatFilter] = React.useState('Sve');
  const [dateFilter, setDateFilter] = React.useState('-');
  const [showFilter, setShowFilter] = React.useState(false);
  const newsSorted = news && news.slice().sort((a, b) => dateFilter === '-' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);
  const [expend, setExpend] = React.useState(news ? {...new Array(news.length).fill(false)}:{...new Array(10).fill(false)});


  const handlePage = (e, value) => {
    setPage(value);
  };
  const handleCatFilter = (e) => {
    setPage(1);
    setCatFilter('Sve');
    setCatFilter(e.target.value);
  }
  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  }
  const handleExpend = (i) => {
    let expended = i === -1 ? expend[0]:expend[i];
    if(i === -1){
      setExpend({
        ...new Array(news.length).fill(!expended)
      })
    }
    else(
      setExpend({
        ...expend,
        [i]:!expended
      })
      )
  }
  

  return (
    newsSorted ?
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.filter}>
          <Grid item xs={12} md={4} >
            <Button 
              className={classes.btn}
              color="primary"
              variant="outlined"
              endIcon={!showFilter ? <ArrowForwardIos />:<ArrowBackIos />}
              onClick={() => setShowFilter(!showFilter)}
            >
              Filteri
          </Button>
          </Grid>
          <Grid item xs={12} md={8}> 
            {  showFilter ?  
            <Grid container direction="row" wrap="nowrap">
              <Grid item xs={4}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-category">Kategorija</InputLabel>
                <Select
                className={classes.select}
                label="Kategorija"
                color="primary"
                native
                value={catFilter}
                onChange={handleCatFilter}
                inputProps={{
                    name: 'category',
                    id: 'outlined-category',
                  }}
                >
                  <option value='Sve'>Sve</option>
                  <option value='Novosti'>Novosti</option>
                  <option value='Prodaja'>Prodaja</option>
                  <option value='Razno'>Razno</option>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={4}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-">Objavljeno</InputLabel>
                <Select
                className={classes.select}
                label="Objavljeno"
                color="primary"
                native
                value={dateFilter}
                onChange={handleDateFilter}
                inputProps={{
                    name: 'date',
                    id: 'outlined-date',
                  }}
                >
                  <option value='-'>Najnovije</option>
                  <option value='+'>Najstarije</option>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={4}>
              <Grid container justify="flex-end">
              <FormControl variant="outlined">
                <Button
                className={classes.btn}
                variant="outlined"
                size="small"
                fullWidth
                endIcon={expend[0] ? <ExpandLess />:<ExpandMore />}
                onClick={() => handleExpend(-1)}
                >
                {expend[0] ? 'Lista':'Detalji'}
                </Button>
              </FormControl>
              </Grid>
              </Grid>
            </Grid>: '' 
            }     
          </Grid>

        </Grid>
        <Grid container spacing={2}>
        {
          newsSorted && newsSorted.filter(a => catFilter === 'Sve' ? a : a.category === catFilter).slice(page * 10 - 10, page * 10).map((aPieceOfNews, index) => {
            return (
            <Grid item xs={12} md={4} key={aPieceOfNews.id}>
              <Card className={classes.cards} >
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <GiSheep size="1em" />
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <Tooltip  disableFocusListener arrow leaveTouchDelay={2000} placement="bottom-end" title={aPieceOfNews.content}>
                        <MoreVertIcon />
                        </Tooltip>
                    </IconButton>
                    }
                    title={aPieceOfNews.title}
                    subheader={aPieceOfNews.createdAt && moment(aPieceOfNews.createdAt.toDate()).format('DD/MM/YYYY')}
                />
                <CardMedia
                    className={classes.media}
                    title="news image"
                    image={aPieceOfNews.url}
                />
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Category />
                        <Typography variant="caption" className={classes.cardFooter}>
                        <Chip label={aPieceOfNews.category} variant="outlined" />
                        <br/>
                        {
                        aPieceOfNews.category !== 'Prodaja' ? '' : aPieceOfNews.checkedP ?
                            <Chip
                            label="Prodato"
                            variant="default"
                            color="secondary"
                            />
                            :
                            <Chip
                            label="Aktuelno"
                            variant="default"
                            className={classes.active}
                            />
                        }
                        </Typography>
                </IconButton>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expend[index],
                    })}
                    onClick={() => handleExpend(index)}
                    aria-expanded={expend[index]}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expend[index]} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="caption">
                        {aPieceOfNews.content}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            </Grid>
            )
          })
        }
        </Grid>
        <Grid container justify="center" className={classes.page}>
          <Pagination count={Math.round(newsSorted.filter(a => catFilter === 'Sve' ? a : a.category === catFilter).length / 10)} page={page} onChange={handlePage} />
        </Grid>
      </div> :
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    news: state.firestore.ordered.news
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'news' }
  ])
)(News);