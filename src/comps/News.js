import React from 'react';
import { 
  makeStyles,
  Accordion,
  Select, 
  InputLabel,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Chip,
  Grid,
  Divider,
  Button,
  FormControl,
  CircularProgress
} from '@material-ui/core/';
import clsx from 'clsx';
import { ExpandMore, ArrowForwardIos, ArrowBackIos } from '@material-ui/icons/';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '75vh'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  column2: {
    flexBasis: '66.66%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  large: {
    width: '95%',
    height: 'auto',
  },
  active: {
    color: '#009933',
    borderColor: '#009933'
  },
  page: {
    marginTop: theme.spacing(2),
  },
  filter: {
    minHeight: '6vh',
    marginBottom: '1vh'
  },
  select: {
    maxHeight: '4vh'
  },
  newsList: {
    minHeight: '70vh'
  }
}));

const News = ({ news }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [catFilter, setCatFilter] = React.useState('Sve');
  const [dateFilter, setDateFilter] = React.useState('-');
  const [showFilter, setShowFilter] = React.useState(false);
  const newsSorted = news && news.slice().sort((a, b) => dateFilter === '-' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);


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
  return (
    newsSorted ?
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.filter}>
          <Grid item xs={4} >
            <Button 
              color="primary"
              variant="outlined"
              endIcon={!showFilter ? <ArrowForwardIos />:<ArrowBackIos />}
              onClick={() => setShowFilter(!showFilter)}
            >
              Filteri
          </Button>
          </Grid>
          <Grid item xs={8} > 
            {  showFilter ?  
            <Grid container direction="row">
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
            </Grid>: '' 
            }     
          </Grid>

        </Grid>
        {
          newsSorted && newsSorted.filter(a => catFilter === 'Sve' ? a : a.category === catFilter).slice(page * 10 - 10, page * 10).map((aPieceOfNews, index) => {
            return (
              <Accordion expanded key={aPieceOfNews.id}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading} align="justify">{aPieceOfNews.title}</Typography>
                  </div>
                  <div className={classes.column}>
                    <Chip label={aPieceOfNews.category} variant="outlined" />
                    {
                      aPieceOfNews.category !== 'Prodaja' ? '' : aPieceOfNews.checkedP ?
                        <Chip
                          label="Prodato"
                          variant="outlined"
                          color="secondary"
                        />
                        :
                        <Chip
                          label="Aktuelno"
                          variant="outlined"
                          className={classes.active}
                        />
                    }
                  </div>
                  <div className={classes.column}>
                    <Chip label={aPieceOfNews.createdAt && moment(aPieceOfNews.createdAt.toDate()).format('DD/MM/YYYY')} variant="outlined" />
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className={classes.column} >
                    <img alt='' src={aPieceOfNews.url} className={classes.large} />
                  </div>
                  <div className={clsx(classes.column2, classes.helper)}>
                    <Typography variant="caption">
                      {aPieceOfNews.content}
                    </Typography>
                  </div>
                </AccordionDetails>
                <Divider />
              </Accordion>
            )
          })
        }
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