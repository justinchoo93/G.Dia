import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
});

const GameItem = ({
  id,
  gameName,
  platform,
  genre,
  imageURL,
  review,
  handleDelete,
}) => {
  const [selectedId, setselectedId] = useState('');

  const onDelete = (i) => {
    setselectedId(i);
    handleDelete(i);
  };

  const genreString = genre.join(', ');
  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardActionArea id={id}>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={gameName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {gameName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Platform: </strong>
            {platform}
            <br />
            <strong>Genre: </strong>
            {genreString}
            <br />
            <strong>Review: </strong>
            {review}
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions id={id}>
        <Button
          id={id}
          size="small"
          color="primary"
          component={Link}
          to={`/edit/${id}`}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="secondary"
          id={id}
          onClick={(e) => onDelete(e.currentTarget.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameItem;
