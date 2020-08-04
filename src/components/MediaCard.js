import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: '1%'
  },
});

export default function MediaCard(props) {
  const {
    image,
    title,
    summary,
    id
  } = props;
  const classes = useStyles();
  const history = useHistory();

  const viewDetails = () => {
    history.push(`/games/${id}`)
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={image}
        title={title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          {title}
        </Typography>
        <Typography style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {summary}
        </Typography>
      </CardContent>
      <CardActions style={{alignSelf: 'center'}}>
          <Button size="small" color="primary" onClick={viewDetails}>
            View
          </Button>
      </CardActions>
    </Card>
  );
}
