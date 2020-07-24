/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Grid,
  makeStyles,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },

  gridContainer: {
    paddingTop: '80px',
  },

  buttonPadding: {
    paddingRight: '5px',
    paddingLeft: '5px',
  },
}));

const GameEdit = (props) => {
  const { match } = props;
  const { params } = match;

  const history = useHistory();

  // state
  const [retrievedGame, setRetrievedGame] = useState({});
  const [changeSubmitted, setChangeSubmitted] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const result = await axios.get(`/api/edit/${params.id}`);
      console.log('result.data', result.data);
      setRetrievedGame(result.data);
    };
    fetchGame();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'gameName':
        setRetrievedGame({ ...retrievedGame, [name]: value });
        // console.log(retrievedGame.gameName);
        break;
      case 'gamePlatform':
        setRetrievedGame({ ...retrievedGame, platform: value });
        // console.log(retrievedGame.platform);
        break;
      case 'gameImage':
        setRetrievedGame({ ...retrievedGame, imageURL: value });
        break;
      case 'gameReview':
        setRetrievedGame({ ...retrievedGame, review: value });
        break;
      default:
        console.log('not working');
    }
  };

  // handle genre checks
  const handleCheckChange = () => {};
  // make a put request
  const handleSubmit = async (e) => {
    const { gameName, platform, genre, imageURL, review } = retrievedGame;
    e.preventDefault();
    const data = {
      gameName,
      platform,
      genre,
      imageURL,
      review,
    };
    await axios
      .put(`/api/edit/${params.id}`, data)
      .then((response) => console.log('response after change', response))
      .catch((err) => {
        console.log('submit put request error: ', err);
      });

    history.push('/');
  };

  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.gridContainer}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="gameName"
          name="gameName"
          label="Game Name"
          value={retrievedGame.gameName}
          onChange={handleInputChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="GamePlatformLabel">Game Platform</InputLabel>
          <Select
            labelId="GamePlatformLabel"
            id="gamePlatform"
            name="gamePlatform"
            value={retrievedGame.platform || ''}
            onChange={handleInputChange}
          >
            <MenuItem value="PC">PC</MenuItem>
            <MenuItem value="PS4">PS4</MenuItem>
            <MenuItem value="XBox One">XBox One</MenuItem>
            <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
          </Select>
        </FormControl>
        <br />

        {/* <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.action}
                onChange={handleCheckChange}
                name="action"
                color="primary"
              />
            }
            label="Action"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.adventure}
                onChange={handleCheckChange}
                name="adventure"
                color="primary"
              />
            }
            label="Adventure"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.mmorpg}
                onChange={handleCheckChange}
                name="mmorpg"
                color="primary"
              />
            }
            label="MMORPG"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.strategy}
                onChange={handleCheckChange}
                name="strategy"
                color="primary"
              />
            }
            label="Strategy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.puzzle}
                onChange={handleCheckChange}
                name="puzzle"
                color="primary"
              />
            }
            label="Puzzle"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.shooter}
                onChange={handleCheckChange}
                name="shooter"
                color="primary"
              />
            }
            label="Shooter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.rythm}
                onChange={handleCheckChange}
                name="rythm"
                color="primary"
              />
            }
            label="Rythm"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.survival}
                onChange={handleCheckChange}
                name="survival"
                color="primary"
              />
            }
            label="Survival"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={retrievedGame.genre.sports}
                onChange={handleCheckChange}
                name="sports"
                color="primary"
              />
            }
            label="Sports"
          />
        </FormGroup> */}
        <br />
        <TextField
          id="gameImage"
          name="gameImage"
          label="Game Image URL (optional)"
          value={retrievedGame.imageURL}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="gameReview"
          name="gameReview"
          label="Game Review"
          value={retrievedGame.review}
          onChange={handleInputChange}
        />

        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default GameEdit;
