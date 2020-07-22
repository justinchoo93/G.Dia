import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameItem from './GameItem.jsx';
import Search from './Search.jsx';

const GamesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const results = await axios.get(`/games/${query}`);
      // console.log('results', results.data);

      setGames(results.data);
      setIsLoading(false);
    };

    fetchGames();
  }, [query]);

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
