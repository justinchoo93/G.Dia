import React, { useState } from 'react';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
    // setselectedId(i);
    console.log('selectdID', i);
    handleDelete(i);
  };

  const genreString = genre.join(', ');
  const classes = useStyles();
  console.log('ids', id);

  return (
    // <div className="gameItem">
    //   <p>Game: {gameName}</p>
    //   <p>platform: {platform}</p>
    //   <p>genre: {genreString}</p>
    //   <p>imageURL: {imageURL}</p>
    //   <p>review: {review}</p>
    //   <button id={id}>Edit</button>
    //   <button id={id} onClick={(e) => onDelete(e.target.id)}>
    //     Delete
    //   </button>
    // </div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} src={imageURL} title={gameName} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {gameName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {platform}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          id={id}
          onClick={(e) => onDelete(e.target.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameItem;
