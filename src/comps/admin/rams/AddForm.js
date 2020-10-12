import React from 'react';
import {
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Chip,
  MenuItem
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { createRam } from '../../../store/actions/ramsActions';
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
  },
  weight: {
    maxWidth: '5vw'
  },
  chip: {
    maxWidth: '100%',
    'text-overflow': 'ellipsis'
  }
}));

const AddForm = (props) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.rams.progress)
  const classes = useStyles();
  const [files, setFiles] = React.useState([])
  const [imgFormatError, setImgFormatError] = React.useState(null);
  const [inputError, setInputError] = React.useState(null);
  const [state, setState] = React.useState({
    name: '',
    mother: '',
    father: '',
    birthDate: '',
    birthType: '',
    bloodLine: '',
    '1day': '',
    '30days': '',
    '45days': '',

  });

  const types = ['image/png', 'image/jpeg'];
  const birthTypes = ['jedinice', 'dvojke', 'trojke', 'četvorke', 'petice'];

  const handleChange = (event) => {
    setInputError(null)
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleDelete = (chipToDelete) => (e) => {
    setFiles([...files.filter(file => file.name !== chipToDelete)]);
  };

  const onFileChange = e => {
    for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random();
    // add an "id" property to each File object
        setFiles(prevState => [...prevState, newFile]);
      }
      console.log(files)
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)
    dispatch(createRam(files, state));
  }
  return (
    <Card className={classes.root}>
      <Typography variant='h5' align="center" >Novi ovan</Typography>
      <form noValidate autoComplete="off">
        <Grid container alignItems="flex-start" spacing={3}>
          <Grid item xs={12} md={6} align="flex-start">
            <Button
              variant="contained"
              fullWidth
              component="label"
              color="primary"
              startIcon={<ImageSearchIcon />}
            >
              <input
                type="file"
                style={{ display: "none" }}
                multiple
                onChange={onFileChange}
              />
              Dodaj slike
            </Button>
            trenutno slika ({files.length})
            <br/>
              {
                files.length ? 
                <Grid item xs={12} align="flex-start">
                  { files.map(file => {                  
                      return (
                        <Chip 
                        className={classes.chip}
                        key={file.id}
                        label={file.name}
                        onDelete={handleDelete(file.name)} 
                        color="primary"
                        variant="outlined" 
                        />
                        )
                    })
                  }
                </Grid>: ''
              }
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField
              className={classes.txt2}
              fullWidth
              id="outlined-textarea"
              label="Tet. br."
              variant="outlined"
              onChange={handleChange}
              name='name'
            />
            <TextField
              className={classes.txt2}
              fullWidth
              id="outlined-textarea"
              label="Krvna linija"
              variant="outlined"
              onChange={handleChange}
              name='bloodLine'
            />
            <TextField
              className={classes.txt2}
              fullWidth
              select
              id="outlined-textarea"
              label="Tip jagnjenja"
              variant="outlined"
              onChange={handleChange}
              value={state.birthType}
              name='birthType'
            >
             {
              birthTypes.map(type => {
                return (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              })
             } 
            </TextField>
            <TextField
              className={classes.txt2}
              fullWidth
              id="outlined-multiline-static"
              label="Majka"
              variant="outlined"
              onChange={handleChange}
              name='mother'
            />
            <TextField
              className={classes.txt2}
              fullWidth
              id="outlined-multiline-static"
              label="Otac"
              variant="outlined"
              onChange={handleChange}
              name='father'
            />
            <TextField
              className={classes.txt2}
              id="date"
              fullWidth
              variant="outlined"
              label="Datun rođenja"
              type="date"
              name="birthDate"
              onChange={handleChange}
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
            />
          <Grid container direction="row" spacing={1} className={classes.txt2}>
          <Grid item xs={12}><Typography variant="caption">Težina</Typography></Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="1-dan"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='1day'
            /></Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="30-dana"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='30days'
            /></Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="45-dana"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='45days'
            /></Grid>
          </Grid>
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