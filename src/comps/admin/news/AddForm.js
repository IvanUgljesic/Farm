import React from 'react';
import {
  Button,
  Card,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  TextField,
  FormControl,
  InputLabel,
  makeStyles
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { createAPieceOfNews } from '../../../store/actions/newsActions';
import ProgressBar from '../gallery/ProgressBar';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: '90%',
    padding: '2vh',
    border: '3px solid #3f51b5'
  },
  img: {
    minWidth: '100%',
    minHeight: '20vh',
    background: 'white',

  },
  txt2: {
    'margin-top': '1vh'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  btn: {
    background: '#4e4e4e',
    color: 'white'
  }
}));

const AddForm = (props) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.news.progress)
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [imgFormatError, setImgFormatError] = React.useState(null);
  const [inputError, setInputError] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [state, setState] = React.useState({
    title: '',
    content: '',
    category: '',
    checkedP: false
  });

  const types = ['image/png', 'image/jpeg']

  const imgPickerHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    let reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result);
    };
    reader.readAsDataURL(selected);


    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setImgFormatError(null);
      setInputError(null);
    } else {
      setFile(null);
      setImgFormatError('Fajl mora biti u png ili jpeg formatu!')
    }
  }

  const handleChange = (event) => {
    setInputError(null)
    const name = event.target.name;
    setState({
      ...state,
      [name]: name === 'checkedP' ? event.target.checked : event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(state).includes('') || imgFormatError !== null) {
      setInputError('* Sva polja su obavezna!')
    }
    else {
      dispatch(createAPieceOfNews(file, state));

    }
  }
  return (
    <Card className={classes.root}>
      <Typography variant='h5' align="center" >Nova vest</Typography>
      <form noValidate autoComplete="off">
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={6} align="center" >
            <Button
              className={classes.img}
              variant="contained"
              component="label"
              startIcon={<ImageSearchIcon />}
              style={{ backgroundImage: `url(${url})`, 'backgroundRepeat': 'no-repeat', 'backgroundSize': '100% 100%' }}
            >
              <TextField
                type="file"
                style={{ display: "none" }}
                onChange={imgPickerHandler}
              />
            </Button>
            {imgFormatError ? <Typography color="error">{imgFormatError}</Typography> : file ? file.name : 'Slika'}
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField
              className={classes.txt1}
              fullWidth
              id="outlined-textarea"
              label="Naslov Vesti"
              multiline
              variant="outlined"
              onChange={handleChange}
              name='title'
            />
            <TextField
              className={classes.txt2}
              fullWidth
              id="outlined-multiline-static"
              label="Tekst Vesti"
              multiline
              rows={6}
              variant="outlined"
              onChange={handleChange}
              name='content'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Kategorija</InputLabel>
              <Select
                native
                value={state.category}
                onChange={handleChange}
                label="category"
                inputProps={{
                  name: 'category',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value='Novosti'>Novosti</option>
                <option value='Prodaja'>Prodaja</option>
                <option value='Razno'>Razno</option>
              </Select>
              {
                state.category === 'Prodaja' ?
                  <FormControlLabel
                    control={<Checkbox
                      color="primary"
                      checked={state.checkedP}
                      onChange={handleChange}
                      name="checkedP"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />}
                    label="prodato"
                    labelPlacement="end"
                  /> : ''
              }

            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
            >
              Upiši
            </Button>
          </Grid>
        </Grid>
      </form>
      { progress > 0 ? <ProgressBar progress={progress} /> : ''}
      { inputError ? <Typography color="error" align="center">{inputError}</Typography> : ''}
    </Card>
  )
}


export default AddForm;