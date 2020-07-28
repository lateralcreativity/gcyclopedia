import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import MediaCard from './MediaCard';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import imageMissing from '../assets/image-missing.svg';

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
  }));

function Home() {
    const classes = useStyles();
    const [searchValues, setSearchValues] = useState('');
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const inputHandler = event => setSearchValues(event.target.value);
    const submitHandler = event => {
        event.preventDefault();
        axiosWithAuth()
            .post(`/games/?search=${searchValues}&fields=name,cover.image_id,genres.name`)
            .then(response => {
                console.log(response)
                if(!response.data[0]) {
                    setData([])
                    setErrorMessage('Game with that name was not found.')
                } else {
                    console.log(response.data)
                    setErrorMessage('');
                    setData([...response.data])
                }
            })
            .catch(error => console.log('Error ->', error))
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
                  <Grid container spacing={2} justify="center">
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
            {errorMessage ? <p>{errorMessage}</p> : <></>}
          </div>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            {!data[0] ? <></> :
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {data.map(game => (
                    game.cover ? 
                <Grid item key={game.id} xs={12} sm={6} md={4}>
                    <MediaCard title={game.name} image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} />
                </Grid> :
                <Grid item key={game.id} xs={12} sm={6} md={4}>
                <MediaCard title={game.name} image={imageMissing} />
            </Grid>
                ))}
              </Grid>
            </Container>}
          </main>
        </>
      );
}

export default Home;