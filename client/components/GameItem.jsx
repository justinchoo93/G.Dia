import React, { useState, useEffect } from 'react';

const GameItem = ({ id, gameName, platform, genre, imageURL, review }) => {
  const handleDelete = (e) => {
    const { id } = e.target;
    console.log(id);
  };

  return (
    <div className="gameItem">
      <p>Game: {gameName}</p>
      <p>platform: {platform}</p>
      <p>genre: {genre}</p>
      <p>imageURL: {imageURL}</p>
      <p>review: {review}</p>
      <button id={id}>Edit</button>
      <button id={id} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default GameItem;
