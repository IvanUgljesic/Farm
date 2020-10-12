import React from 'react';
import { 
    makeStyles,
    GridListTileBar,
    IconButton,
    GridList,
    GridListTile,
    CircularProgress,
    Grid,
    useMediaQuery
} from '@material-ui/core/';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';
import useFirestore from '../hooks/useFirestore';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%'
    },
    icon : {
        color: 'white',
        cursor: 'pointer'
    },
    page: {
      marginTop: theme.spacing(2),
      minWidth: '100%',
      maxHeight: '5vh'
    },
}));
const ImageGrid1 = ({ setSelectedImg }) => {
    const { docs } = useFirestore('gallery');
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const matches = useMediaQuery('(min-width:600px)');


    const handlePage = (e, value) => {
        setPage(value);
    };

    return (
        <div className={classes.root}>
         { 
            docs && docs.length === 0 ? 
            <Grid container justify="center" alignContent="center">
                <CircularProgress />
            </Grid>:
            <GridList cellHeight={300} className={classes.gridList} cols={3}>
                {docs.slice(page * 10 - 10, page * 10).map((tile, index) => (
                    <GridListTile key={tile.id} cols={!matches ? 3:(index+1)%5===0 ? 2:1}>
                    <img alt='' src={tile.url}/>
                    <GridListTileBar
                    title={tile.title}
                    subtitle={<span>{tile.description}</span>}
                    actionIcon={
                        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={() => setSelectedImg(tile.url)}>
                        <ZoomOutMap />
                        </IconButton>
                    }
                    />    
                    </GridListTile>
                ))}
                <Grid container justify="center" className={classes.page}>
                <Pagination count={Math.ceil(docs.length / 10)} page={page} onChange={handlePage} />
                </Grid>
            </GridList>
         }
        </div>
    );
}

export default ImageGrid1;
