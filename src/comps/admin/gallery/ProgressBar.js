import React from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '10px',
        background:'#3f51b5',
        'margin-top': '20px'
    },
  }));

const ProgressBar = ({progress}) => {
    const classes = useStyles();

    return (
        <Box>
        <motion.div className={classes.root}
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
        >            
        </motion.div>
        <Typography variant="caption" align="center" paragraph={true}>{ Math.round(progress) + '%'}</Typography>
        </Box>
    )
}

export default ProgressBar;