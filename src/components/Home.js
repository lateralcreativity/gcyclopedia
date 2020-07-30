import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import MediaCard from './MediaCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import imageMissing from '../assets/image-missing.svg';
import { connect } from 'react-redux';
import { getGame } from '../store/actions';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      borderBottom: '2px solid black',
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    search: {
      position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      width: 'auto',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '50ch'
      },
  }}));

function Home({ gameData, errorMessage, getGame }) {
    const classes = useStyles();
    const [gameName, setGameName] = useState('');

    const inputHandler = event => setGameName(event.target.value);
    const submitHandler = event => {
        event.preventDefault();
        getGame(gameName);
    }

    return (
        <>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Welcome to Gcyclopedia
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  To get started simply search for a game.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={1} justify="center" alignItems="flex-end">
                      <Grid item>
                      <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
                      </Grid>
                    <Grid item>
                    <div className={classes.search}>
            <form onSubmit={submitHandler}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={inputHandler}
            />
            </form>
            {errorMessage ? <p style={{color: 'red'}}>{errorMessage}</p> : <></>}
          </div>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            {!gameData[0] ? <></> :
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {gameData.map(game => (
                    game.cover ? 
                <Grid item key={game.id} xs={12} sm={6} md={4}>
                    <MediaCard title={game.name} image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} summary={game.summary} id={game.id} />
                </Grid> :
                <Grid item key={game.id} xs={12} sm={6} md={4}>
                <MediaCard title={game.name} image={imageMissing} summary={game.summary} />
            </Grid>
                ))}
              </Grid>
            </Container>}
          </main>
        </>
      );
}

const mapStateToProps = state => {
  return {
    gameData: state.gameData,
    errorMessage: state.errorMessage
  }
}

export default connect(
  mapStateToProps,
  { getGame }
)(Home);