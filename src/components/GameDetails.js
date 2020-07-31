import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGameDetails } from '../store/actions';
import imageMissing from '../assets/image-missing.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5% 0',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    },
    contentBp: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5% 0',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        paddingLeft: '5%',
    },
    textContainerBp: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    imgContainer: {
        marginBottom: '5%'
    },
    img: {
        boxShadow: '0 10px 16px 0 rgba(0,0,0,1),0 35px 20px 0 rgba(0,0,0,0.19)',
        borderRadius: '10%'
    },
}));

function GameDetails({ gameDetails, getGameDetails }) {
    const params = useParams();
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:667px)');

    useEffect(() => {
        getGameDetails(params.id)
    }, [])

    if(!gameDetails.videos) {
        document.body.style.backgroundImage = 'linear-gradient(to top, #cfd9df 100%, #e2ebf0 100%)'
    }

    return (
        <ThemeProvider theme={theme}>
        <main className={classes.root}>
            <div className={matches ? classes.content : classes.contentBp} style={!gameDetails.summary || !gameDetails.videos ? {borderBottom: '',} : {borderBottom: '2px solid black',}}>
                <div style={matches ? {display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'} : {display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                {gameDetails.cover ?
                    <div className={classes.imgContainer}>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gameDetails.cover.image_id}.jpg`}
                            alt={`${gameDetails.name} cover`}
                            className={classes.img}
                            />
                    </div>
                    :
                    <div className={classes.imgContainer}>
                        <img
                            src={imageMissing}
                            alt={`${gameDetails.name} cover`}
                            className={classes.img}
                            />
                    </div>}
                <div className={matches ? classes.textContainer : classes.textContainerBp}>
                    <Typography component="h2" variant="h2" style={matches ? {marginTop: ''} : {marginTop: '10%'}}>
                        {gameDetails.name}
                    </Typography>
                    <Typography component="h3" variant="h3">
                        {gameDetails.release_dates ? gameDetails.release_dates[0].human : <></>}
                    </Typography>
                    <br/>
                    <Typography component="h5" variant="h5">
                        {gameDetails.genres ? 'Genres:' : <></>}
                        {gameDetails.genres ? gameDetails.genres.map(genre => <div key={genre.id}>{genre.name}<br/></div>) : <></>}
                    </Typography>
                </div>
                </div>
                <Typography component="p" style={{width: '80%', textAlign: 'center', paddingTop: '5%'}}>
                    {gameDetails.summary ? gameDetails.summary : 'No game details :('}
                </Typography>
            </div>
            {gameDetails.videos ?
                gameDetails.videos.map(video => {
                    return <iframe 
                    style={{width: '97vw', height: '80vh', margin: '8% 0 6% 0', alignSelf: 'center' }}
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