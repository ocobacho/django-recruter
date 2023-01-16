import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from "../../logo.svg"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function DefaultCard({campaing, setCurrent, setSelected}) {
  const classes = useStyles();

  function onApply() {
    setCurrent('CampaignDetail');
    setSelected([campaing.id]);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {campaing.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {campaing.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onApply}>
          Apply
        </Button>
        <Button size="small" color="primary" >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
