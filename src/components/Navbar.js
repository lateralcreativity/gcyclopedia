import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { connect } from 'react-redux';
import { getGame } from '../store/actions';
import { useHistory } from 'react-router-dom';
import background from '../assets/gaming-pattern.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textOverflow: 'clip',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(7),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

function Navbar({ getGame }) {
  const classes = useStyles();
  const [gameName, setGameName] = useState('');
  let history = useHistory()

  const inputHandler = event => setGameName(event.target.value);
  const submitHandler = event => {
    event.preventDefault();
    document.body.style.backgroundImage = `url("${background}")`
    getGame(gameName);
    history.push('/');
    setGameName('');
  }
  const redirectHandler = event => {
    event.preventDefault();
    document.body.style.backgroundImage = `url("${background}")`;
    history.push('/');
    setGameName('');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#13151a'}}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Gcyclopedia
            <IconButton 
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={redirectHandler}
            >
              <SportsEsportsIcon htmlColor={'#3cf73c'}/>
          </IconButton>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={submitHandler}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value = {gameName}
              onChange={inputHandler}
            />
            </form>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(
  null,
  { getGame }
)(Navbar);