import React from 'react';
import {
  Button,
  Card,
  Grid,
  Typography,
  TextField,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import { createRam } from '../../../store/actions/ramsActions';
import ProgressBar from '../gallery/ProgressBar';
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from './ImageUploader';

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
  },
  weight: {
    maxWidth: '5vw'
  }
}));

const AddForm = (props) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.rams.progress);
  const classes = useStyles();
  const [files, setFiles] = React.useState([]);
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
    '100days': '',

  });
  console.log(state)

  const types = ['image/png', 'image/jpeg'];
  const fatherPedigree = ['oo', 'ooo', 'oom', 'om', 'omo', 'omm'];
  const motherPedigree = ['mo', 'moo', 'mom', 'mm', 'mmo', 'mmm'];
  const birthTypes = ['jedinice', 'dvojke', 'trojke', 'četvorke', 'petice'];

  const handleChange = (event) => {
    setInputError(null)
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(state)
  };

  const handleDelete = (chipToDelete) => (e) => {
    setFiles([...files.filter(file => file.name !== chipToDelete)]);
  };

  const onFileChange = e => {
    setImgFormatError(null);
    for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random(); // add an "id" property to each File object
        if(!types.includes(newFile.type)){
          setImgFormatError('format slike mora biti jpeg ili png!');
        }
        else if(newFile.size/1024 > 512){
          setImgFormatError("max dozvoljena velicina slike je 512Kb, sliku možete resajzovati");
        }
        else {
          setFiles(prevState => [...prevState, newFile]);
        }
      }
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
          <Grid item sm={12} md={6}>   
            <Grid container spacing={1}>{/* father pedigree*/}
            <Grid item xs={12}><Typography variant="caption">Pedigre oca</Typography></Grid>
              <TextField
                fullWidth
                label="Otac"
                variant="outlined"
                onChange={handleChange}
                name='father'
              /> 
              {
                fatherPedigree.map((mark, i) => {
                  return (
                    <Grid item xs={4} key={mark}>
                      <TextField
                        className={classes.txt2}
                        fullWidth
                        label={mark}
                        variant="outlined"
                        onChange={handleChange}
                        name={mark}
                      /> 
                    </Grid>
                  )
                })
              }
            </Grid>                 
            <Grid container spacing={1}>{/* mothers pedigree*/}
            <Grid item xs={12}><Typography variant="caption">Pedigre majka</Typography></Grid>
              <TextField
                fullWidth
                label="Majka"
                variant="outlined"
                onChange={handleChange}
                name='mother'
              /> 
              {
                motherPedigree.map((mark, i) => {
                  return (
                    <Grid item xs={4} key={mark}>
                      <TextField
                        className={classes.txt2}
                        fullWidth
                        label={mark}
                        variant="outlined"
                        onChange={handleChange}
                        name={mark}
                      /> 
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            <ImageUploader files={files} handleDelete={handleDelete} onFileChange={onFileChange} imgFormatError={imgFormatError}/>  
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
              label="100-dana"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='100days'
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