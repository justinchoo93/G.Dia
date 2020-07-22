/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';

const GameForm = () => {
  // initial state
  const [gameName, setGameName] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [genre, setGenre] = useState('');
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
      case 'gameGenre':
        setGenre(value);
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
    setPlatform('PC');
    setGenre('');
    setImageURL('');
    setReview('');
    setSubmitted(false);
  };

  // if submitted is true, we'll show submitted successfully phrase
  // if false, render the form page
  return submitted ? (
    <div className="submittedContainer">
      <h3> Submitted successfully! Thank you</h3>
      <button onClick={handleAddAnother}>Add another game</button>
    </div>
  ) : (
    <form className="gameForm" onSubmit={handleSubmit}>
      <label>
        Game Name:
        <br />
        <input
          type="text"
          id="gameName"
          name="gameName"
          value={gameName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Game Platform:
        <br />
        <select
          id="gamePlatform"
          name="gamePlatform"
          value={platform}
          onChange={handleInputChange}
        >
          <option value="PC">PC</option>
          <option value="PS4">PS4</option>
          <option value="XBox One">XBox One</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
      </label>
      <br />
      <label>
        Game Genre:
        <br />
        <input
          type="text"
          id="gameGenre"
          placeholder="ex) action, adventure, puzzle, etc... "
          name="gameGenre"
          value={genre}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Game Image(optional):
        <br />
        <input
          type="text"
          id="gameImage"
          name="gameImage"
          value={imageURL}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Write a Review:
        <br />
        <input
          type="text"
          id="gameReview"
          name="gameReview"
          value={review}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default GameForm;
