import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { Grid, Typography } from '@material-ui/core';

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images');
    return (
        docs.length ?
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" key={doc.id}
                    layout
                    whileHover={{ opacity: 1, cursor: 'pointer' }}
                    onClick={() => setSelectedImg(doc.url)}
                >
                    <img src={doc.url} alt="uploaded img" />
                </motion.div>
            ))}
        </div> :
        <Grid container justify="center">
            <Typography variant="h6">Učitavanje...</Typography>
        </Grid>
    )
}

export default ImageGrid;