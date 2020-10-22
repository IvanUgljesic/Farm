import React from 'react';
import {
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { uploadImage } from '../../../store/actions/galleryActions';
import ProgressBar from '../gallery/ProgressBar';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const UploadForm = (props) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.gallery.progress)
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [imgFormatError, setImgFormatError] = React.useState(null);
  const [inputError, setInputError] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [state, setState] = React.useState({
    title: '',
    description: '',
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
      [name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(state).includes('') || imgFormatError !== null) {
      setInputError('* Sva polja su obavezna!')
    }
    else {
      dispatch(uploadImage(file, state));

    }
  }
  return (
    <Card className={classes.root}>
      <Typography variant='h5' align="center" >Nova slika</Typography>
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
              label="Naziv"
              multiline
              variant="outlined"
              onChange={handleChange}
              name='title'
            />
            <TextField
              className={classes.txt2}
              fullWidth
              id="outlined-multiline-static"
              label="Kratak opis"
              multiline
              rows={6}
              variant="outlined"
              onChange={handleChange}
              name='description'
            />
          </Grid>
        </Grid>
          <Grid container spacing={3} justify="flex-end">
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


export default UploadForm;