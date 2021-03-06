import React from 'react';
import {
    Button,
    Grid,
    makeStyles,
    Chip,
    Typography,
    Link
} from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';


const useStyles = makeStyles((theme) => ({
    chips:{
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    chip: {
        maxWidth: '100%',
        'text-overflow': 'ellipsis',
    }
}));

const ImageUploader = ({ files, handleDelete, onFileChange, imgFormatError }) => {
    const classes = useStyles();
    return (
            <Grid item xs={12}>
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
                        multiple="multiple"
                        onChange={onFileChange}
                    />
                Dodaj slike
                </Button>
                <br />
                {
                    files.length ?
                        <Grid item xs={12} className={classes.chips}>
                            {files.map(file => {
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
                        </Grid> : ''
                }
            trenutno slika ({files.length})
            <br/>
            { imgFormatError ? 
                <Typography variant="caption" color="secondary">
                    {imgFormatError} {imgFormatError.includes('512') ? <Link href="https://resizeimage.net/" target="_blank" rel="noreferrer" underline="always">ovde</Link>:''}
                </Typography>:'' 
            }
          </Grid>
    )
}

export default ImageUploader;
