import React, { useState } from 'react';

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

  return (
    <div className="gameItem">
      <p>Game: {gameName}</p>
      <p>platform: {platform}</p>
      <p>genre: {genreString}</p>
      <p>imageURL: {imageURL}</p>
      <p>review: {review}</p>
      <button id={id}>Edit</button>
      <button id={id} onClick={(e) => onDelete(e.target.id)}>
        Delete
      </button>
    </div>
  );
};

export default GameItem;
