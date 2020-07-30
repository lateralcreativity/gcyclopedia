import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGameDetails } from '../store/actions';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    content: {
        display: 'flex',
        padding: '5% 0',
        width: '100%',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textAlign: 'center'
    }
}));

function GameDetails({ gameDetails, getGameDetails }) {
    const params = useParams();
    const classes = useStyles();

    useEffect(() => {
        getGameDetails(params.id)
    }, [getGameDetails])

    return (
        <ThemeProvider theme={theme}>
        <main className={classes.root}>
            <div className={classes.content}>
                {gameDetails.cover ?
                    <div className={classes.imgContainer}>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameDetails.cover.image_id}.jpg`}
                            alt={`${gameDetails.name} cover`}
                            style={{ borderRadius: '10%' }} />
                    </div>
                    :
                    'Loading...'}
                <div className={classes.textContainer}>
                    <Typography component="h2" variant="h2">
                        {gameDetails.name}
                    </Typography>
                    <Typography component="h3" variant="h3">
                        {gameDetails.release_dates ? gameDetails.release_dates[0].human : 'Loading...'}
                    </Typography>
                    <br/>
                    <Typography component="h5" variant="h5">
                        Genres:
                        {gameDetails.genres ? gameDetails.genres.map(genre => <div key={genre.id}>{genre.name}<br/></div>) : 'Loading...'}
                    </Typography>
                </div>
            </div>
            <Typography component="p" style={{width: '80%', alignSelf: 'center', textAlign: 'center'}}>
                {gameDetails.summary ? gameDetails.summary : 'Loading...'}
            </Typography>
            {gameDetails.videos ?
                gameDetails.videos.map(video => {
                    return <iframe 
                    style={{width: '97vw', height: '80vh', margin: '2% 0', alignSelf: 'center'}}
                    key={video.id}
                    title="youtube video"
                    src={`https://www.youtube-nocookie.com/embed/${video.video_id}`}
                    frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                    </iframe>
                })
                : <></>}
        </main>
        </ThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        gameDetails: state.gameDetails
    }
}

export default connect(mapStateToProps, { getGameDetails })(GameDetails);