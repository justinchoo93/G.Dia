/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
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

const GameForm = (props) => {
  // initial state
  const history = useHistory();
  const [gameName, setGameName] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState({
    action: false,
    adventure: false,
    mmorpg: false,
    strategy: false,
    puzzle: false,
    shooter: false,
    rythm: false,
    survival: false,
    sports: false,
  });
  const [imageURL, setImageURL] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'gameName':
        setGameName(value);
        break;
      case 'gamePlatform':
        setPlatform(value);
        break;
      case 'gameImage':
        setImageURL(value);
        break;
      case 'gameReview':
        setReview(value);
        break;
      default:
        console.log('not working');
    }
  };
  const handleCheckChange = (e) => {
    setGenre({ ...genre, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      gameName,
      platform,
      genre,
      imageURL,
      review,
    };
    // console.log('data', data);
    axios
      .post('/api/add', data)
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log('submit post request error: ', err);
      });
  };

  const handleAddAnother = () => {
    setGameName('');
    setPlatform('');
    setGenre({});
    setImageURL('');
    setReview('');
    setSubmitted(false);
  };
  // console.log('props', props);
  const handleClickToMyGames = () => {
    props.history.push('/games');
    // console.log('props after')
  };

  const classes = useStyles();

  // if submitted is true, we'll show submitted successfully phrase
  // if false, render the form page
  return submitted ? (
    <Grid
      container
      className={classes.gridContainer}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h3> Submitted successfully! Thank you</h3>

      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          onClick={handleAddAnother}
          color="primary"
          className={classes.buttonPadding}
        >
          Add another game
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/')}
          className={classes.buttonPadding}
        >
          My Games
        </Button>
      </Grid>

      {/* <button onClick={handleAddAnother}>Add another game</button> */}
    </Grid>
  ) : (
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
          value={gameName}
          onChange={handleInputChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="GamePlatformLabel">Game Platform</InputLabel>
          <Select
            labelId="GamePlatformLabel"
            id="gamePlatform"
            name="gamePlatform"
            value={platform}
            onChange={handleInputChange}
          >
            <MenuItem value="PC">PC</MenuItem>
            <MenuItem value="PS4">PS4</MenuItem>
            <MenuItem value="XBox One">XBox One</MenuItem>
            <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={genre.action}
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
                checked={genre.adventure}
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
                checked={genre.mmorpg}
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
                checked={genre.strategy}
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
                checked={genre.puzzle}
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
                checked={genre.shooter}
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
                checked={genre.rythm}
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
                checked={genre.survival}
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
                checked={genre.sports}
                onChange={handleCheckChange}
                name="sports"
                color="primary"
              />
            }
            label="Sports"
          />
        </FormGroup>
        <br />
        <TextField
          id="gameImage"
          name="gameImage"
          label="Game Image URL (optional)"
          value={imageURL}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="gameReview"
          name="gameReview"
          label="Game Review"
          value={review}
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

export default GameForm;
