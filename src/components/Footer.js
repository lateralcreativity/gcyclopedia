import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
      borderTop: '2px solid black'
    },
    icon: {
        textDecoration: 'none',
        color: 'black'
    }
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        <Link color="inherit" href="https://www.gabrieldelgado.tech">
          Gabriel Delgado
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  export default function Footer() {
      const classes = useStyles();
    return (
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
            Contact Me
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                <Link href="https://linkedin.com/in/gabriel-delgado-tech" target="_blank" aria-hidden="false" aria-label="Linkedin Profile">
                    <LinkedInIcon className={classes.icon} aria-hidden="false" />
                </Link>
                <Link href="mailto:lateralcreativity@outlook.com" aria-hidden="false" aria-label="Email Me">
                    <EmailIcon className={classes.icon} aria-hidden="false" />
                </Link>
            </Typography>
            <Copyright />
          </footer>
      );
  }