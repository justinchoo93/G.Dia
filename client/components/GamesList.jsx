import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Grid } from '@material-ui/core';
import GameItem from './GameItem.jsx';
import Search from './Search.jsx';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '20px',
    paddingTop: '40px',
  },
});

const GamesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

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
    // console.log('id in game list', i);
    const results = await axios.delete(`/api/games/${i}`);
    // console.log('results.data', results.data);
    setGames(results.data);
  };

  const classes = useStyles();

  return isLoading ? (
    <div>Loading... Please Wait...</div>
  ) : (
    <>
      <Search getQuery={(q) => setQuery(q)} games={games} />
      <Grid container spacing={2} className={classes.gridContainer}>
        {games.map((game) => (
          <Grid key={game._id} item xs={12} s={6} md={3}>
            <GameItem
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
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GamesList;
