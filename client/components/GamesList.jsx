import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameItem from './GameItem.jsx';
import Search from './Search.jsx';

const GamesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const results = await axios.get(`/api/games/${query}`);
      // console.log('results', results.data);

      setGames(results.data);
      setIsLoading(false);
    };

    fetchGames();
  }, [query]);

  const handleDelete = async (i) => {
    console.log('id in game list', i);
    const results = await axios.delete(`/api/games/${i}`);
    // console.log('results.data', results.data);
    setGames(results.data);
  };

  const gameArray = games.map((game) => {
    return (
      <GameItem
        key={game._id}
        id={game._id}
        gameName={game.gameName}
        platform={game.platform}
        genre={game.genre}
        imageURL={game.imageURL}
        review={game.review}
        handleDelete={(i) => {
          handleDelete(i);
        }}
      />
    );
  });

  return isLoading ? (
    <div>Loading... Please Wait...</div>
  ) : (
    <section className="gameList">
      <Search getQuery={(q) => setQuery(q)} games={games} />
      {gameArray}
    </section>
  );
};

export default GamesList;
