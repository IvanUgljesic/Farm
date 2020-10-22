import React from 'react';
import {
  Button,
  Avatar,
  Grid,
  Typography,
  TextField,
  makeStyles,
  MenuItem
} from '@material-ui/core';
import { Delete } from '@material-ui/icons/';
import ImageUploader from './ImageUploader';
import { editRam } from '../../../store/actions/ramsActions';
import { useDispatch } from "react-redux";


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
    },
    chip: {
      maxWidth: '100%',
      'text-overflow': 'ellipsis'
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    picControl: {
      display: 'flex',
      flexDirection: 'row',
    }
  }));

const EditForm = ({ram}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [ramForEditing, setRamForEditing] = React.useState({...ram});
    const birthTypes = ['jedinice', 'dvojke', 'trojke', 'četvorke', 'petice'];
    const [files, setFiles] = React.useState([]);
    


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


    const handleChange = (event) => {
        const name = event.target.name;
        setRamForEditing({
            ...ramForEditing,
            [name]: event.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editRam(files, ramForEditing));
    }

    const deleteImage = (url) => {
        setRamForEditing({
            ...ramForEditing,
            urls: ramForEditing.urls.filter(item => item !== url),
        });
    };


    return(
        <form noValidate autoComplete="off">
        <Grid container alignItems="flex-start" spacing={3}>
          <Grid item sm={12}>
          <ImageUploader files={files} handleDelete={handleDelete} onFileChange={onFileChange}/>
          </Grid>
            {
                ramForEditing.urls.map(url => {
                    return (
                      <Grid item xs={12} sm={6} md={3} key={url} className={classes.picControl}>  
                        <Avatar alt="" src={url} className={classes.large}/>                     
                        <Button
                        onClick={() => deleteImage(url)}                        
                        >
                        <Delete />
                        </Button>
                      </Grid>
                    )                        
                })
            }
          <Grid item sm={12}>
            <TextField
              className={classes.txt2}
              fullWidth
              label="Tet. br."
              variant="outlined"
              onChange={handleChange}
              name='name'
              value={ramForEditing.name}
            />
            <TextField
              className={classes.txt2}
              fullWidth
              label="Krvna linija"
              variant="outlined"
              onChange={handleChange}
              name='bloodLine'
              value={ramForEditing.bloodLine}
            />
            <TextField
              className={classes.txt2}
              fullWidth
              select
              label="Tip jagnjenja"
              variant="outlined"
              onChange={handleChange}
              name='birthType'
              value={ramForEditing.birthType}
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
              label="Majka"
              variant="outlined"
              onChange={handleChange}
              name='mother'
              value={ramForEditing.mother}
            />
            <TextField
              className={classes.txt2}
              fullWidth
              label="Otac"
              variant="outlined"
              onChange={handleChange}
              name='father'
              value={ramForEditing.father}
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
              defaultValue={ramForEditing.birthDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          <Grid container direction="row" spacing={1} className={classes.txt2}>
          <Grid item xs={12}><Typography variant="caption">Težina</Typography></Grid>
          <Grid item xs={4}>
            <TextField
              label="1-dan"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='1day'
              value={ramForEditing['1day']}
            /></Grid>
          <Grid item xs={4}>
            <TextField
              label="30-dana"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='30days'
              value={ramForEditing['30days']}
            /></Grid>
          <Grid item xs={4}>
            <TextField
              label="45-dana"
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              name='45days'
              value={ramForEditing['45days']}
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
              Izemni
            </Button>
          </Grid>
        </Grid>
      </form>
    )
}

export default EditForm;